export type Team = 'TEAM_A' | 'TEAM_B' | 'UNASSIGNED'
export type EloPlayer = { id: string; eloRating: number; matchesPlayed: number }
export type RatedParticipant = EloPlayer & { team: Team; checkedIn: boolean }

export const SEED_ELO = { beginner: 1000, intermediate: 1200, advanced: 1400 } as const
export const K_FACTOR = (matchesPlayed: number) => matchesPlayed < 15 ? 32 : 20

/** Deterministic greedy snake draft: strongest first, placing each player on the side
 * with the lower current rating total (team-size normalized). */
export function balanceTeams<T extends EloPlayer>(players: T[]): Array<T & { team: Exclude<Team, 'UNASSIGNED'> }> {
  const sorted = [...players].sort((a, b) => b.eloRating - a.eloRating || a.id.localeCompare(b.id))
  const teams: [T[], T[]] = [[], []]
  const totals = [0, 0]
  for (const player of sorted) {
    let side: 0 | 1
    if (teams[0].length !== teams[1].length) {
      side = teams[0].length < teams[1].length ? 0 : 1
    } else {
      const deltaIfA = Math.abs((totals[0] + player.eloRating) / (teams[0].length + 1) - (teams[1].length ? totals[1] / teams[1].length : 0))
      const deltaIfB = Math.abs((teams[0].length ? totals[0] / teams[0].length : 0) - (totals[1] + player.eloRating) / (teams[1].length + 1))
      side = deltaIfA <= deltaIfB ? 0 : 1
    }
    teams[side].push(player)
    totals[side] += player.eloRating
  }
  return teams.flatMap((team, index) => team.map((player) => ({ ...player, team: index === 0 ? 'TEAM_A' as const : 'TEAM_B' as const })))
}

export function expectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + 10 ** ((ratingB - ratingA) / 400))
}

export function updateMatchRatings(participants: RatedParticipant[], scoreA: number) {
  if (![0, 0.5, 1].includes(scoreA)) throw new Error('scoreA must be 0, 0.5, or 1')
  const a = participants.filter((p) => p.team === 'TEAM_A' && p.checkedIn)
  const b = participants.filter((p) => p.team === 'TEAM_B' && p.checkedIn)
  if (!a.length || !b.length) throw new Error('Both teams need checked-in players')
  const avgA = a.reduce((sum, p) => sum + p.eloRating, 0) / a.length
  const avgB = b.reduce((sum, p) => sum + p.eloRating, 0) / b.length
  const expectedA = expectedScore(avgA, avgB)
  return participants.map((player) => {
    if (!player.checkedIn || player.team === 'UNASSIGNED') return { ...player, eloAfter: player.eloRating }
    const result = player.team === 'TEAM_A' ? scoreA : 1 - scoreA
    return { ...player, eloAfter: Math.round(player.eloRating + K_FACTOR(player.matchesPlayed) * (result - (player.team === 'TEAM_A' ? expectedA : 1 - expectedA))) }
  })
}

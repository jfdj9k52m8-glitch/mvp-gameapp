export type Attendance = 'JOINED' | 'CHECKED_IN' | 'LATE_CANCEL' | 'GHOSTED'
export type ReliabilityState = { reliabilityScore: number; ghostCount: number; cooldownUntil: Date | null; eloRating: number; matchesPlayed: number }

export function cancelParticipation(state: ReliabilityState, startTime: Date, now = new Date()) {
  const hoursUntilStart = (startTime.getTime() - now.getTime()) / 3_600_000
  if (hoursUntilStart > 6) return { ...state, attendanceStatus: null as Attendance | null, slotReleased: true, penalty: 0 }
  return { ...state, attendanceStatus: 'LATE_CANCEL' as const, eloRating: state.eloRating - 15, reliabilityScore: Math.max(0, state.reliabilityScore - 5), slotReleased: false, penalty: 15 }
}

export function markGhosted(state: ReliabilityState, confirmationCount: number, now = new Date()) {
  if (confirmationCount < 2) throw new Error('At least two other participants must confirm a no-show')
  const reliabilityScore = Math.max(0, state.reliabilityScore - 15)
  return { ...state, attendanceStatus: 'GHOSTED' as const, eloRating: state.eloRating - 40, ghostCount: state.ghostCount + 1, reliabilityScore, cooldownUntil: reliabilityScore < 60 ? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) : state.cooldownUntil }
}

export function recoverReliability(state: ReliabilityState, attendanceStatus: Attendance) {
  return attendanceStatus === 'CHECKED_IN' ? { ...state, reliabilityScore: Math.min(100, state.reliabilityScore + 2) } : state
}

export function canJoinLobby(state: Pick<ReliabilityState, 'reliabilityScore' | 'cooldownUntil'>, now = new Date()) {
  return state.reliabilityScore >= 70 && (!state.cooldownUntil || state.cooldownUntil <= now)
}

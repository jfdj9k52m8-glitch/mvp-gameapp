export type DiscoveryUser = { id: string; city: string; locality: string; reliabilityScore: number; clanIds: string[]; sportRatings: Array<{ sport: string; eloRating: number }> }
export type DiscoverySwipe = { swiperId: string; targetUserId: string; sport: string; action: 'INVITE' | 'PASS' }

export function discoverCandidates(current: DiscoveryUser, sport: string, users: DiscoveryUser[], swipes: DiscoverySwipe[]) {
  const rating = current.sportRatings.find((item) => item.sport === sport)?.eloRating
  if (rating === undefined) return []
  const swiped = new Set(swipes.filter((swipe) => swipe.swiperId === current.id && swipe.sport === sport).map((swipe) => swipe.targetUserId))
  return users.filter((candidate) => {
    const candidateRating = candidate.sportRatings.find((item) => item.sport === sport)?.eloRating
    return candidate.id !== current.id && candidate.city === current.city && candidateRating !== undefined && Math.abs(candidateRating - rating) <= 250 && candidate.reliabilityScore >= 70 && !swiped.has(candidate.id)
  }).map((candidate) => ({ ...candidate, rating: candidate.sportRatings.find((item) => item.sport === sport)!.eloRating, sameLocality: candidate.locality === current.locality, sharedClan: candidate.clanIds.some((id) => current.clanIds.includes(id)) })).sort((a, b) => Number(b.sameLocality || b.sharedClan) - Number(a.sameLocality || a.sharedClan) || Math.abs(a.rating - rating) - Math.abs(b.rating - rating) || a.id.localeCompare(b.id))
}

export function isMutualInvite(outgoing: DiscoverySwipe, reverse?: DiscoverySwipe) {
  return outgoing.action === 'INVITE' && reverse?.action === 'INVITE'
}

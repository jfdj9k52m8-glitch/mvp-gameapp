export function qualifiesForTrustIncrement(maxPlayers: number, attendanceStatuses: string[]) {
  if (maxPlayers <= 0) return false
  const checkedIn = attendanceStatuses.filter((status) => status === 'CHECKED_IN').length
  return checkedIn / maxPlayers >= 0.7
}

export function shouldIncrementTurfTrust(previousStatus: string, nextStatus: string, maxPlayers: number, attendanceStatuses: string[]) {
  return previousStatus !== 'COMPLETED' && nextStatus === 'COMPLETED' && qualifiesForTrustIncrement(maxPlayers, attendanceStatuses)
}

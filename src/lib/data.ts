export const sports = ['All sports', 'Football', 'Cricket', 'Badminton', 'Basketball', 'Padel', 'Tennis'] as const
export type SportName = typeof sports[number]

export const matches = [
  { id: 'm1', sport: 'Football', title: 'Midweek 5-a-side', turf: 'The Arena, Saket', locality: 'Saket', time: 'Today, 7:30 PM', date: 'TODAY', price: 220, players: 8, max: 10, elo: '1,050 – 1,450', image: 'photo-1522778119026-d647f0596c20', host: 'Arjun Mehta', initials: 'AM', tags: ['All levels', 'Floodlights'] },
  { id: 'm2', sport: 'Badminton', title: 'Doubles, good rallies only', turf: 'Smash Point', locality: 'Hauz Khas', time: 'Today, 8:00 PM', date: 'TODAY', price: 180, players: 3, max: 4, elo: '1,100 – 1,500', image: 'photo-1626224583764-f87db24ac4ea', host: 'Rhea Kapoor', initials: 'RK', tags: ['Doubles', 'Indoor'] },
  { id: 'm3', sport: 'Cricket', title: 'Sunday nets & a proper game', turf: 'Pitch Please', locality: 'Vasant Kunj', time: 'Sun, 8:00 AM', date: 'SUN, OCT 25', price: 150, players: 9, max: 14, elo: '900 – 1,350', image: 'photo-1531415074968-036ba1b575da', host: 'Kabir Anand', initials: 'KA', tags: ['Leather ball', 'All levels'] },
  { id: 'm4', sport: 'Padel', title: 'King of the court', turf: 'Padel Social', locality: 'Mehrauli', time: 'Tomorrow, 6:00 PM', date: 'TOMORROW', price: 350, players: 2, max: 4, elo: '1,200 – 1,600', image: 'photo-1554068865-24cecd4e34b8', host: 'Maya Shah', initials: 'MS', tags: ['Intermediate', 'Outdoor'] },
]

export const turfs = [
  { name: 'The Arena', locality: 'Saket', distance: '1.2 km', matches: 248, rating: '4.9', price: 900, sports: ['Football', 'Basketball'], image: 'photo-1522778119026-d647f0596c20', verified: true },
  { name: 'Smash Point', locality: 'Hauz Khas', distance: '2.4 km', matches: 186, rating: '4.8', price: 500, sports: ['Badminton', 'Tennis'], image: 'photo-1626224583764-f87db24ac4ea', verified: true },
  { name: 'Padel Social', locality: 'Mehrauli', distance: '3.1 km', matches: 92, rating: '4.9', price: 1400, sports: ['Padel'], image: 'photo-1554068865-24cecd4e34b8', verified: true },
  { name: 'Pitch Please', locality: 'Vasant Kunj', distance: '4.8 km', matches: 134, rating: '4.7', price: 1200, sports: ['Cricket', 'Football'], image: 'photo-1531415074968-036ba1b575da', verified: true },
  { name: 'Baseline Courts', locality: 'Greater Kailash', distance: '5.2 km', matches: 76, rating: '4.8', price: 700, sports: ['Tennis', 'Basketball'], image: 'photo-1554068865-24cecd4e34b8', verified: false },
  { name: 'The Court House', locality: 'South Extension', distance: '6.1 km', matches: 111, rating: '4.6', price: 650, sports: ['Badminton'], image: 'photo-1626224583764-f87db24ac4ea', verified: true },
]

export const players = [
  { name: 'Ananya Rao', sport: 'Football', rating: 1284, locality: 'Saket', reliability: 98, matches: 32, image: 'photo-1534528741775-53994a69daeb', bio: 'Midfield by choice, snacks captain by nature.' },
  { name: 'Dev Malhotra', sport: 'Football', rating: 1320, locality: 'Hauz Khas', reliability: 96, matches: 47, image: 'photo-1500648767791-00dcc994a43e', bio: 'Here for the through balls and good vibes.' },
  { name: 'Ishita Sen', sport: 'Badminton', rating: 1198, locality: 'Saket', reliability: 100, matches: 21, image: 'photo-1531123897727-8f129e1688ce', bio: 'Competitive doubles, friendly rematches.' },
  { name: 'Rahul Verma', sport: 'Cricket', rating: 1412, locality: 'Vasant Kunj', reliability: 93, matches: 54, image: 'photo-1506794778202-cad84cf45f1d', bio: 'Opening bat. Will bring the tennis balls too.' },
]

export const clans = [
  { name: 'Saket Strikers', area: 'Saket', members: 148, elo: 1384, change: '+42', image: 'photo-1522778119026-d647f0596c20', color: 'lime' },
  { name: 'Hauz Khas Hustle', area: 'Hauz Khas', members: 126, elo: 1342, change: '+28', image: 'photo-1626224583764-f87db24ac4ea', color: 'purple' },
  { name: 'Vasant Victors', area: 'Vasant Kunj', members: 112, elo: 1296, change: '+35', image: 'photo-1531415074968-036ba1b575da', color: 'orange' },
]

export const img = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

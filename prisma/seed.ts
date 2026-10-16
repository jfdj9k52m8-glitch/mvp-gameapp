import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const Sport = { FOOTBALL: 'FOOTBALL', CRICKET: 'CRICKET', BADMINTON: 'BADMINTON', BASKETBALL: 'BASKETBALL', PADEL: 'PADEL', TENNIS: 'TENNIS' } as const
const venues = [
  { name: 'The Arena', locality: 'Saket', address: 'Press Enclave Marg, Saket', lat: 28.5245, lng: 77.2066, photo: 'photo-1522778119026-d647f0596c20', price: 900, sports: [Sport.FOOTBALL, Sport.BASKETBALL], matches: 248, amenities: ['Floodlights','Parking','Drinking Water'] },
  { name: 'Smash Point', locality: 'Hauz Khas', address: 'Aurobindo Marg, Hauz Khas', lat: 28.5494, lng: 77.2001, photo: 'photo-1626224583764-f87db24ac4ea', price: 500, sports: [Sport.BADMINTON, Sport.TENNIS], matches: 186, amenities: ['Indoor','Changing Rooms','Parking'] },
  { name: 'Padel Social', locality: 'Mehrauli', address: 'Mehrauli-Gurgaon Road, Mehrauli', lat: 28.5167, lng: 77.1855, photo: 'photo-1554068865-24cecd4e34b8', price: 1400, sports: [Sport.PADEL], matches: 92, amenities: ['Floodlights','Cafe','Equipment Rental'] },
  { name: 'Pitch Please', locality: 'Vasant Kunj', address: 'Nelson Mandela Road, Vasant Kunj', lat: 28.5244, lng: 77.1577, photo: 'photo-1531415074968-036ba1b575da', price: 1200, sports: [Sport.CRICKET, Sport.FOOTBALL], matches: 134, amenities: ['Floodlights','Changing Rooms','Drinking Water'] },
  { name: 'The Court House', locality: 'Greater Kailash', address: 'M Block Market, Greater Kailash', lat: 28.5494, lng: 77.2425, photo: 'photo-1626224583764-f87db24ac4ea', price: 650, sports: [Sport.BADMINTON], matches: 111, amenities: ['Indoor','Parking'] },
]
const names = ['Arjun Mehta','Ananya Rao','Dev Malhotra','Ishita Sen','Rahul Verma','Maya Shah','Kabir Anand','Rhea Kapoor','Aarav Khanna','Tara Sethi','Vihaan Roy','Diya Nair','Aditya Bose','Nisha Gill','Karan Batra','Sana Qureshi','Rohan Das','Meera Iyer','Zoya Mirza','Neil Dutta']
const localities = ['Saket','Hauz Khas','Vasant Kunj']
const pics = ['photo-1500648767791-00dcc994a43e','photo-1534528741775-53994a69daeb','photo-1506794778202-cad84cf45f1d','photo-1531123897727-8f129e1688ce']

async function main() {
  for (const venue of venues) {
    await prisma.turf.upsert({ where: { name: venue.name }, update: { totalMatchesHosted: venue.matches }, create: { name: venue.name, city: 'Delhi', locality: venue.locality, address: venue.address, latitude: venue.lat, longitude: venue.lng, photos: [`https://images.unsplash.com/${venue.photo}?auto=format&fit=crop&w=1000&q=85`], isPartnerVerified: true, totalMatchesHosted: venue.matches, pricePerHour: venue.price, supportedSports: venue.sports, amenities: venue.amenities } })
  }
  const clanData = [{ name: 'Saket Strikers', locality: 'Saket', aggregateElo: 1384 }, { name: 'Hauz Khas Hustle', locality: 'Hauz Khas', aggregateElo: 1342 }, { name: 'Vasant Victors', locality: 'Vasant Kunj', aggregateElo: 1296 }]
  for (const clan of clanData) await prisma.clan.upsert({ where: { name: clan.name }, update: {}, create: { ...clan, city: 'Delhi', description: `The ${clan.locality} neighborhood sports community.` } })
  const users = [] as Array<{id:string;locality:string}>
  for (let i = 0; i < names.length; i++) {
    const user = await prisma.user.upsert({ where: { email: `player${i+1}@rally.example` }, update: {}, create: { email: `player${i+1}@rally.example`, name: names[i], city: 'Delhi', locality: localities[i % 3], avatarUrl: `https://images.unsplash.com/${pics[i % pics.length]}?auto=format&fit=crop&w=240&q=80`, reliabilityScore: 87 + (i % 14), sportRatings: { create: [{ sport: [Sport.FOOTBALL,Sport.BADMINTON,Sport.CRICKET][i % 3], eloRating: 1000 + (i * 37) % 540, matchesPlayed: 4 + i * 2, wins: i % 7, losses: i % 4 }] } } })
    users.push({ id: user.id, locality: user.locality })
  }
  for (let i = 0; i < users.length; i++) {
    const clan = clanData.find(c => c.locality === users[i].locality)!
    const dbClan = await prisma.clan.findUniqueOrThrow({ where: { name: clan.name } })
    await prisma.clanMember.upsert({ where: { clanId_userId: { clanId: dbClan.id, userId: users[i].id } }, update: {}, create: { clanId: dbClan.id, userId: users[i].id, role: i === 0 ? 'FOUNDER' : 'MEMBER' } })
  }
  console.log('Seeded 5 verified turfs, 20 mock players, and 3 locality clans.')
}
main().catch((error) => { console.error(error); process.exit(1) }).finally(() => prisma.$disconnect())

# RALLY — Local Sports Club

A responsive Next.js MVP for finding nearby pickup games, discovering players, exploring verified turfs, and repping your neighborhood clan. Payment collection is intentionally **coming soon**; the interface directs players to settle fees at the venue.

## Stack

- Next.js 15 App Router + React 19 + strict TypeScript
- Tailwind CSS 4, custom responsive UI, lucide-react, framer-motion
- PostgreSQL + Prisma schema/seed; Prisma client singleton
- TanStack Query provider and Zod for future API boundaries

The current UI uses a curated local demo dataset so it runs without credentials. PostgreSQL is wired through Prisma but is not required for the preview. Authentication/OAuth and phone verification are not configured yet; replace the demo identity with the selected Auth.js or Supabase provider before production.

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000. The app includes the dashboard, match directory/details, turf directory, swipe discovery, clans leaderboard, player card, and a host-game modal. The swipe cards support drag and button actions; joining a game updates the local demo state.

## Database setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to a PostgreSQL instance.
2. Run `npx prisma generate`.
3. Run `npx prisma db push` to create the schema.
4. Run `npm run db:seed` to create five verified turfs, twenty mock players, and three neighborhood clans.

`src/lib/engine` contains deterministic, database-independent rules for team balancing and Elo updates, attendance penalties/reliability, turf trust, and discovery filtering. Call these from transactional server actions before wiring production APIs.

## Checks

```bash
npm run typecheck
npm run build
```

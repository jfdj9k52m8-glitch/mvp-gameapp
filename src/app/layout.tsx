import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from '@/components/AppShell'
import { QueryProvider } from '@/components/QueryProvider'

export const metadata: Metadata = {
  title: 'RALLY — Your game is out there',
  description: 'Find your people. Play your game. The local sports community, in one place.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><QueryProvider><AppShell>{children}</AppShell></QueryProvider></body></html>
}

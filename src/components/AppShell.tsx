'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, ChevronDown, CircleHelp, Compass, MapPin, Menu, Plus, Search, Trophy, Users, X, Zap } from 'lucide-react'
import { useState, type ReactNode } from 'react'

const nav = [
  { label: 'Discover', href: '/', icon: Compass },
  { label: 'Find a game', href: '/matches', icon: Zap },
  { label: 'Players', href: '/discover', icon: Users },
  { label: 'Turfs', href: '/turfs', icon: MapPin },
  { label: 'Clans', href: '/clans', icon: Trophy },
]

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  return <div className="app-frame">
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <Link href="/" className="brand" onClick={() => setMobileOpen(false)}><span className="brand-mark"><span>R</span></span><span>rally<span className="brand-period">.</span></span></Link>
      <div className="side-label">PLAY</div>
      <nav className="side-nav">{nav.map(({ label, href, icon: Icon }) => {
        const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return <Link key={label} href={href} className={`nav-link ${active ? 'active' : ''}`} onClick={() => setMobileOpen(false)}><Icon size={18} strokeWidth={active ? 2.2 : 1.8} /><span>{label}</span>{label === 'Players' && <span className="nav-new">NEW</span>}</Link>
      })}</nav>
      <div className="sidebar-promo">
        <div className="promo-icon"><Trophy size={17}/></div><strong>Your neighborhood<br/>has a leaderboard.</strong><p>Join your local clan and rep your area.</p><Link href="/clans">Explore clans <span>↗</span></Link>
      </div>
      <div className="sidebar-bottom"><a href="#help" className="nav-link muted"><CircleHelp size={18}/><span>Help & support</span></a><div className="profile-mini"><div className="avatar avatar-me">AM</div><div className="profile-name"><b>Arjun Mehta</b><span>Delhi · 1,284 Elo</span></div><ChevronDown size={16}/></div></div>
    </aside>
    {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu"/>}
    <main className="main-area">
      <header className="topbar"><div className="mobile-brand"><button className="icon-button menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">{mobileOpen ? <X size={21}/> : <Menu size={21}/>}</button><Link href="/" className="brand"><span className="brand-mark"><span>R</span></span><span>rally<span className="brand-period">.</span></span></Link></div><div className="location-select"><MapPin size={16}/><span>South Delhi</span><ChevronDown size={14}/></div><div className="top-actions"><button className="icon-button search-button" aria-label="Search"><Search size={19}/></button><button className="icon-button notification-button" aria-label="Notifications"><Bell size={19}/><i/></button><button className="create-button" onClick={() => setShowCreate(true)}><Plus size={17}/><span>Host a game</span></button><div className="top-avatar">AM</div></div></header>
      <div className="page-content">{children}</div>
    </main>
    {showCreate && <CreateMatchModal onClose={() => setShowCreate(false)} />}
  </div>
}

function CreateMatchModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false)
  return <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={19}/></button>{sent ? <div className="modal-success"><div className="success-icon">✓</div><h2>You’re on the roster.</h2><p>Game creation is coming soon. We’ll let you know when you can host your first match.</p><button className="primary-button" onClick={onClose}>Sounds good</button></div> : <><div className="eyebrow">MAKE IT HAPPEN</div><h2>Host a game</h2><p className="modal-intro">Bring your people together. Pick the details and we’ll find the players.</p><label>Sport<select><option>Football</option><option>Cricket</option><option>Badminton</option><option>Basketball</option><option>Padel</option><option>Tennis</option></select></label><label>Choose a turf<select><option>The Arena · Saket</option><option>Smash Point · Hauz Khas</option><option>Pitch Please · Vasant Kunj</option></select></label><div className="form-row"><label>Date<input type="date" defaultValue="2026-10-18"/></label><label>Start time<input type="time" defaultValue="19:30"/></label></div><label>Players needed<input type="number" defaultValue="10" min="2"/></label><div className="coming-soon"><span>₹</span><div><b>Payments are coming soon</b><small>For now, settle up with your teammates at the turf.</small></div></div><button className="primary-button full-button" onClick={() => setSent(true)}>Continue <span>→</span></button></>}</div></div>
}

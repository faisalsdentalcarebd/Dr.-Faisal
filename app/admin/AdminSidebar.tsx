'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, CalendarDays, FileText, ImageIcon, Stethoscope, ExternalLink, LogOut, Menu, X } from 'lucide-react'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarDays, exact: false },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText, exact: false },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon, exact: false },
  { href: '/admin/services', label: 'Services', icon: Stethoscope, exact: false },
]

function SidebarContent({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname()

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <aside
      className="flex flex-col h-full w-64 flex-shrink-0"
      style={{ background: '#0f172a' }}
    >
      {/* Logo */}
      <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex flex-col items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Faisal's Dental Care"
            style={{ width: 140, height: 'auto', filter: 'brightness(0) invert(1)' }}
          />
          <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#475569' }}>Admin Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-0.5">
        <p className="text-xs font-semibold uppercase tracking-widest px-4 mb-3" style={{ color: '#334155' }}>
          Menu
        </p>
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact)
          return (
            <Link
              key={href}
              href={href}
              onClick={onNav}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
              style={{
                background: active ? 'rgba(27,111,201,0.12)' : 'transparent',
                color: active ? '#1B6FC9' : '#64748b',
                borderLeft: active ? '3px solid #1B6FC9' : '3px solid transparent',
              }}
            >
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 space-y-0.5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
          style={{ color: '#475569' }}
        >
          <ExternalLink size={16} />
          View Website
        </a>
        <a
          href="/api/auth/signout"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 hover:text-red-400"
          style={{ color: '#475569' }}
        >
          <LogOut size={16} />
          Sign Out
        </a>
      </div>
    </aside>
  )
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  if (pathname === '/admin/login') return null

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <div className="hidden lg:flex h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile hamburger button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
        style={{ background: '#0f172a', color: 'white' }}
        onClick={() => setOpen(v => !v)}
        aria-label="Toggle menu"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className="lg:hidden fixed top-0 left-0 bottom-0 z-40 flex transition-transform duration-300"
        style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <SidebarContent onNav={() => setOpen(false)} />
      </div>
    </>
  )
}

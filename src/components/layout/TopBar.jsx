import { CalendarDays, Stethoscope } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { NAV_ITEMS } from '@/components/layout/navItems'
import { greeting, todayLabel } from '@/lib/utils'

// Top of every page: a friendly greeting and today's date. On phones (no sidebar) it also
// shows the logo and the navigation.
export default function TopBar() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      {/* Phones and tablets: compact app bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 lg:hidden">
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="rounded-lg bg-linear-to-br from-blue-600 to-teal-500 p-1.5 text-white">
            <Stethoscope size={18} aria-hidden="true" />
          </span>
          Dental Care
        </Link>
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, match }) => (
            <Link
              key={to}
              to={to}
              aria-label={label}
              aria-current={match(pathname) ? 'page' : undefined}
              className={`rounded-lg p-2 ${
                match(pathname) ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Icon size={20} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>

      {/* Every screen size: greeting + date */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 lg:px-8 lg:py-4">
        <p className="text-sm text-slate-600 lg:text-base">
          <span className="font-semibold text-slate-900">{greeting()}</span> 👋 Welcome back.
        </p>
        <p className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          <CalendarDays size={14} aria-hidden="true" /> {todayLabel()}
        </p>
      </div>
    </header>
  )
}

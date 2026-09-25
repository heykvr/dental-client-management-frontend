import { Stethoscope } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { NAV_ITEMS } from '@/components/layout/navItems'

// Left sidebar (desktop): logo and main navigation. ("Add patient" is the floating button.)
export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200/70 bg-white lg:flex">
      <Link to="/" className="flex items-center gap-3 px-6 py-5">
        <span className="rounded-xl bg-linear-to-br from-blue-600 to-teal-500 p-2 text-white shadow-md shadow-blue-600/20">
          <Stethoscope size={20} aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="block font-semibold text-slate-900">Dental Care</span>
          <span className="block text-xs text-slate-500">Patient management</span>
        </span>
      </Link>

      <nav aria-label="Main" className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, match }) => {
          const active = match(pathname)
          return (
            <Link
              key={to}
              to={to}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <p className="text-center text-xs text-slate-400">All times in IST</p>
      </div>
    </aside>
  )
}

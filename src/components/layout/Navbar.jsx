import { Stethoscope } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="rounded-lg bg-blue-600 p-1.5 text-white">
            <Stethoscope size={18} />
          </span>
          Dental Patient Management
        </Link>
        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600">
          Dashboard
        </Link>
      </div>
    </header>
  )
}

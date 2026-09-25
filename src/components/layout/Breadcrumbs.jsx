import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// "Dashboard › Aarav Ramesh": shows where you are and one click back.
// items: [{ label, to? }]  (the last item is the current page, without a link)
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1">
              {item.to && !last ? (
                <Link to={item.to} className="hover:text-blue-600">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className="font-medium text-slate-900"
                >
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight size={14} aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

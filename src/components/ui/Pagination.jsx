import { ChevronLeft, ChevronRight } from 'lucide-react'

const MAX_PAGE_BUTTONS = 10

// Previous · 1 2 3 … 10 · Next. Shows up to 10 page numbers around the current page.
export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  // A window of up to 10 pages that keeps the current page roughly in the middle
  let first = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2))
  const last = Math.min(totalPages, first + MAX_PAGE_BUTTONS - 1)
  first = Math.max(1, last - MAX_PAGE_BUTTONS + 1)
  const pages = Array.from({ length: last - first + 1 }, (_, i) => first + i)

  const base = 'inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm'
  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={`${base} text-slate-600 hover:bg-slate-100 disabled:text-slate-300`}
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onChange(number)}
          aria-current={number === page ? 'page' : undefined}
          className={`${base} ${
            number === page
              ? 'bg-blue-600 font-medium text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={`${base} text-slate-600 hover:bg-slate-100 disabled:text-slate-300`}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}

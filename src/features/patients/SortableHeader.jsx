import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

// A column title you can click to sort by it. Click again to flip the direction.
// sort: { field, order } of the list; onSort(field) is called on click.
export default function SortableHeader({ label, field, sort, onSort, className = '' }) {
  const active = sort.field === field
  const Icon = !active ? ArrowUpDown : sort.order === 'asc' ? ArrowUp : ArrowDown
  return (
    <th
      className={`px-5 py-2 font-medium ${className}`}
      aria-sort={active ? (sort.order === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className={`inline-flex items-center gap-1 uppercase hover:text-slate-900 ${
          active ? 'text-blue-700' : ''
        }`}
      >
        {label}
        <Icon size={13} aria-hidden="true" className={active ? '' : 'opacity-50'} />
      </button>
    </th>
  )
}

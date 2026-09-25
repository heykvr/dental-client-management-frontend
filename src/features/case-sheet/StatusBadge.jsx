const STATUS = {
  not_started: { label: 'Not started', className: 'bg-slate-100 text-slate-600' },
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-700' },
  completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-700' },
}

// Case sheet status, set by the server on every save
export default function StatusBadge({ status }) {
  const { label, className } = STATUS[status] ?? STATUS.not_started
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>{label}</span>
  )
}

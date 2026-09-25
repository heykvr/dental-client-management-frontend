const SIZES = { sm: 'h-4 w-4 border-2', md: 'h-6 w-6 border-2', lg: 'h-10 w-10 border-4' }

export default function Spinner({ size = 'md', label }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-slate-500" role="status">
      <span
        className={`animate-spin rounded-full border-current border-t-transparent ${SIZES[size]}`}
      />
      {label}
    </span>
  )
}

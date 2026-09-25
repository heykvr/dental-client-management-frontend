import { REQUIRED_FIELDS } from '@/features/case-sheet/caseSheetSchema'

// "3 of 5 required fields" with a small bar, so it's clear what is left to complete
export default function CompletionProgress({ filled }) {
  const total = REQUIRED_FIELDS.length
  const percent = Math.round((filled / total) * 100)
  const done = filled === total
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-2 w-28 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={filled}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Required fields filled"
      >
        <div
          className={`h-full rounded-full transition-all ${done ? 'bg-emerald-500' : 'bg-amber-400'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-slate-600">
        {filled} of {total} required fields
      </span>
    </div>
  )
}

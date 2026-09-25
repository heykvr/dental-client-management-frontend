import { AlertTriangle, RefreshCw, Sparkles } from 'lucide-react'

import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Spinner from '@/components/ui/Spinner'
import { useGenerateSummary } from '@/hooks/useCaseSheet'
import { formatDateTime } from '@/lib/utils'

// The mockup's teal "AI Generated Summary" card. The server writes the summary in the
// background after each save; this card shows which state it is in.
export default function AiSummaryCard({ patientId, sheet }) {
  const regenerate = useGenerateSummary(patientId)
  const summary = sheet.ai_summary
  const generating = summary.state === 'generating' || regenerate.isPending
  const failed = summary.state === 'failed' && !regenerate.isPending
  const outdated = summary.is_stale && !generating && !failed
  const empty = sheet.status === 'not_started'

  return (
    <section className="rounded-2xl border border-teal-100 bg-teal-50/70 p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-semibold text-teal-800">
          <Sparkles size={18} /> AI Generated Summary
        </h2>
        {!empty && !generating && (
          <Button
            variant="ghost"
            className="px-2! py-1! text-teal-700"
            onClick={() => regenerate.mutate()}
          >
            <RefreshCw size={14} /> {failed ? 'Retry' : 'Regenerate'}
          </Button>
        )}
      </div>

      {empty ? (
        <p className="text-sm text-slate-500">Enter case sheet details to get an AI summary.</p>
      ) : (
        <div className="space-y-3">
          {generating && <Spinner size="sm" label="Updating summary…" />}
          {failed && (
            <p className="flex items-center gap-2 text-sm text-amber-700">
              <AlertTriangle size={16} /> Couldn't update the summary.
            </p>
          )}
          {outdated && (
            <p className="flex items-center gap-2 text-sm text-amber-700">
              <AlertTriangle size={16} /> Outdated: the record changed after this summary.
            </p>
          )}

          {summary.text ? (
            <div
              className={`rounded-xl border border-teal-100 bg-white p-4 text-sm leading-relaxed text-slate-700 ${
                generating || outdated ? 'opacity-60' : ''
              }`}
            >
              {summary.text}
            </div>
          ) : (
            !generating && <p className="text-sm text-slate-500">No summary yet.</p>
          )}

          {summary.text && (
            <p className="text-xs text-slate-500">
              AI-generated, review before use · {formatDateTime(summary.generated_at)}
            </p>
          )}
          <ErrorMessage error={regenerate.error} />
        </div>
      )}
    </section>
  )
}

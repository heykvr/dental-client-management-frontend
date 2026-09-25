import { AlertTriangle, CheckCircle2, Lightbulb, RefreshCw, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'

import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Spinner from '@/components/ui/Spinner'
import { useToast } from '@/components/ui/toastContext'
import { useGenerateSummary } from '@/hooks/useCaseSheet'
import { formatDateTime } from '@/lib/utils'

const NEXT_STEP = /suggested next step:/i

// Summary prose, with the "Suggested next step:" line (if any) shown as its own highlighted
// block. The model sometimes writes it on the same line, so split on the label, not newlines.
function SummaryText({ text }) {
  const match = NEXT_STEP.exec(text)
  if (!match) return <p>{text}</p>
  const summary = text.slice(0, match.index).trim()
  const nextStep = text.slice(match.index + match[0].length).trim()
  return (
    <div className="space-y-3">
      {summary && <p>{summary}</p>}
      <div className="flex gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-blue-900">
        <Lightbulb size={16} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
        <p>
          <span className="font-semibold">Suggested next step: </span>
          {nextStep}
        </p>
      </div>
    </div>
  )
}

// The mockup's teal "AI Generated Summary" card. The server writes the summary in the
// background after each save; this card shows which state it is in.
export default function AiSummaryCard({ patientId, sheet }) {
  const regenerate = useGenerateSummary(patientId)
  const summary = sheet.ai_summary
  const generating = summary.state === 'generating' || regenerate.isPending
  const failed = summary.state === 'failed' && !regenerate.isPending
  const outdated = summary.is_stale && !generating && !failed
  const empty = sheet.status === 'not_started'
  // Up to date = the summary was written from exactly the current record
  const upToDate = Boolean(summary.text) && summary.state === 'ready' && !summary.is_stale
  // Only offer an AI call when it can change something (outdated, failed, or no summary yet)
  const canRegenerate = !empty && !generating && (failed || outdated || !summary.text)
  const toast = useToast()

  // Tell the user when a summary that was being written becomes ready (only on that change)
  const previousState = useRef(summary.state)
  useEffect(() => {
    if (previousState.current === 'generating' && summary.state === 'ready') {
      toast.success('AI summary updated')
    }
    previousState.current = summary.state
  }, [summary.state, toast])

  return (
    // Gradient border: a 1px gradient "frame" around a white card
    <section className="rounded-2xl bg-linear-to-br from-teal-400 via-cyan-400 to-violet-400 p-px shadow-sm">
      <div className="rounded-[15px] bg-linear-to-br from-teal-50 to-white p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 font-semibold text-teal-800">
            <Sparkles size={18} /> AI Generated Summary
          </h2>
          {canRegenerate && (
            <Button
              variant="ghost"
              className="px-2! py-1! text-teal-700"
              onClick={() => regenerate.mutate()}
            >
              <RefreshCw size={14} /> {failed ? 'Retry' : 'Regenerate'}
            </Button>
          )}
          {upToDate && !generating && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              <CheckCircle2 size={14} aria-hidden="true" /> Up to date
            </span>
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
                <SummaryText text={summary.text} />
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
      </div>
    </section>
  )
}

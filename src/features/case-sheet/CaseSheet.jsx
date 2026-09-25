import { ClipboardPlus, Pencil } from 'lucide-react'
import { useState } from 'react'

import Button from '@/components/ui/Button'
import CaseSheetForm from '@/features/case-sheet/CaseSheetForm'
import { countRequiredFilled } from '@/features/case-sheet/caseSheetSchema'
import CaseSheetView from '@/features/case-sheet/CaseSheetView'
import CompletionProgress from '@/features/case-sheet/CompletionProgress'
import StatusBadge from '@/features/case-sheet/StatusBadge'
import { formatDateTime } from '@/lib/utils'

// The case sheet on the profile page: read-only by default, with an Edit button.
// Saving (or Cancel) goes back to the read-only view on the same page.
export default function CaseSheet({ patientId, sheet }) {
  const [editing, setEditing] = useState(false)
  const notStarted = sheet.status === 'not_started'

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Case sheet</h2>
          <StatusBadge status={sheet.status} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {!editing && !notStarted && sheet.status !== 'completed' && (
            <CompletionProgress filled={countRequiredFilled(sheet)} />
          )}
          <p className="text-xs text-slate-500">
            {notStarted ? 'Not saved yet' : `Last saved ${formatDateTime(sheet.updated_at)}`}
          </p>
          {!editing && !notStarted && (
            <Button variant="secondary" onClick={() => setEditing(true)}>
              <Pencil size={16} /> Edit
            </Button>
          )}
        </div>
      </div>

      {editing ? (
        <CaseSheetForm patientId={patientId} sheet={sheet} onDone={() => setEditing(false)} />
      ) : notStarted ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white py-10 text-center">
          <p className="font-medium text-slate-700">No case sheet yet</p>
          <p className="text-sm text-slate-500">
            Record the chief complaint, investigation and diagnosis.
          </p>
          <Button onClick={() => setEditing(true)}>
            <ClipboardPlus size={16} /> Start case sheet
          </Button>
        </div>
      ) : (
        <CaseSheetView sheet={sheet} />
      )}
    </div>
  )
}

import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Skeleton from '@/components/ui/Skeleton'
import CaseSheet from '@/features/case-sheet/CaseSheet'
import ChatPanel from '@/features/chat/ChatPanel'
import EditPatientModal from '@/features/patients/EditPatientModal'
import PatientHeader from '@/features/patients/PatientHeader'
import AiSummaryCard from '@/features/summary/AiSummaryCard'
import { useCaseSheet } from '@/hooks/useCaseSheet'
import { usePatient } from '@/hooks/usePatients'
import NotFoundPage from '@/pages/NotFoundPage'

// Patient profile, laid out like the mockup:
//   header card (details + Edit) across the top
//   left: case sheet form        right: AI summary card + chatbot
export default function PatientProfilePage() {
  const { patientId } = useParams()
  const { data: patient, isPending, isError, error, refetch } = usePatient(patientId)
  const caseSheet = useCaseSheet(patientId)
  const [editOpen, setEditOpen] = useState(false)

  if (isPending) {
    return (
      <div className="space-y-6" aria-label="Loading patient">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-36 rounded-2xl" />
        <CaseSheetSkeleton />
      </div>
    )
  }
  if (isError && error.status === 404) return <NotFoundPage />
  if (isError) return <ErrorMessage error={error} onRetry={refetch} />

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Patients', to: '/patients' }, { label: patient.full_name }]} />

      <PatientHeader
        patient={patient}
        action={
          <Button
            variant="secondary"
            className="border-white bg-white font-semibold text-blue-700 shadow-md hover:bg-blue-50"
            onClick={() => setEditOpen(true)}
          >
            <Pencil size={16} /> Edit
          </Button>
        }
      />
      <EditPatientModal patient={patient} open={editOpen} onClose={() => setEditOpen(false)} />

      {caseSheet.isError ? (
        <ErrorMessage error={caseSheet.error} onRetry={caseSheet.refetch} />
      ) : caseSheet.isPending ? (
        <CaseSheetSkeleton />
      ) : (
        // grid-cols-1 + min-w-0: wide content (e.g. the chat chip row) scrolls inside its card
        // instead of stretching the column past the screen on phones
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
          <div className="min-w-0 lg:col-span-3">
            {/* key: fresh state per patient, so nothing leaks between patients */}
            <CaseSheet key={patientId} patientId={patientId} sheet={caseSheet.data} />
          </div>
          <div className="min-w-0 space-y-6 lg:col-span-2">
            <AiSummaryCard patientId={patientId} sheet={caseSheet.data} />
            {/* key: each patient has their own conversation */}
            <ChatPanel key={`chat-${patientId}`} patientId={patientId} />
          </div>
        </div>
      )}
    </div>
  )
}

// Placeholder for the two-column case sheet area while it loads
function CaseSheetSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-4 lg:col-span-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
      </div>
      <div className="space-y-6 lg:col-span-2">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  )
}

import { ArrowLeft, Pencil } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Spinner from '@/components/ui/Spinner'
import CaseSheetForm from '@/features/case-sheet/CaseSheetForm'
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
      <div className="py-20 text-center">
        <Spinner label="Loading patient…" />
      </div>
    )
  }
  if (isError && error.status === 404) return <NotFoundPage />
  if (isError) return <ErrorMessage error={error} onRetry={refetch} />

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft size={16} /> Back to dashboard
      </Link>

      <PatientHeader
        patient={patient}
        action={
          <Button variant="secondary" onClick={() => setEditOpen(true)}>
            <Pencil size={16} /> Edit
          </Button>
        }
      />
      <EditPatientModal patient={patient} open={editOpen} onClose={() => setEditOpen(false)} />

      {caseSheet.isError ? (
        <ErrorMessage error={caseSheet.error} onRetry={caseSheet.refetch} />
      ) : caseSheet.isPending ? (
        <div className="py-10 text-center">
          <Spinner label="Loading case sheet…" />
        </div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* key: a fresh form per patient, so values never leak between patients */}
            <CaseSheetForm
              key={patientId}
              patientId={patientId}
              patientName={patient.full_name}
              sheet={caseSheet.data}
            />
          </div>
          <div className="space-y-6 lg:col-span-2">
            <AiSummaryCard patientId={patientId} sheet={caseSheet.data} />
            {/* key: each patient has their own conversation */}
            <ChatPanel key={`chat-${patientId}`} patientId={patientId} />
          </div>
        </div>
      )}
    </div>
  )
}

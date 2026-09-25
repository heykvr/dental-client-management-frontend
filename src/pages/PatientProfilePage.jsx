import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import Card from '@/components/ui/Card'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Spinner from '@/components/ui/Spinner'
import PatientHeader from '@/features/patients/PatientHeader'
import { usePatient } from '@/hooks/usePatients'
import { formatDateTime } from '@/lib/utils'
import NotFoundPage from '@/pages/NotFoundPage'

export default function PatientProfilePage() {
  const { patientId } = useParams()
  const { data: patient, isPending, isError, error, refetch } = usePatient(patientId)

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

      <PatientHeader patient={patient} />

      <Card title="Patient details">
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Address</dt>
            <dd className="text-slate-900">{patient.address}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Registered</dt>
            <dd className="text-slate-900">{formatDateTime(patient.created_at)}</dd>
          </div>
        </dl>
      </Card>
    </div>
  )
}

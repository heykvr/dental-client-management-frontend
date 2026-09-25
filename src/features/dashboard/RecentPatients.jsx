import { Link } from 'react-router-dom'

import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import StatusBadge from '@/features/case-sheet/StatusBadge'
import PatientAvatar from '@/features/patients/PatientAvatar'
import { usePrefillPatient } from '@/hooks/usePatients'
import { formatDateTime } from '@/lib/utils'

export default function RecentPatients({ patients }) {
  const prefillPatient = usePrefillPatient()
  return (
    <Card
      title="Recent patients"
      subtitle="Latest registrations"
      action={
        <Link to="/patients" className="text-xs font-medium text-blue-600 hover:underline">
          View all
        </Link>
      }
    >
      {patients.length === 0 ? (
        <EmptyState title="No patients yet" description="Newly added patients appear here." />
      ) : (
        <ul className="divide-y divide-slate-100">
          {patients.map((patient) => (
            <li key={patient.patient_id}>
              <Link
                to={`/patients/${patient.patient_id}`}
                onClick={() => prefillPatient(patient)}
                className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-slate-50"
              >
                <PatientAvatar patient={patient} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2">
                    <span className="truncate font-medium text-slate-900">{patient.full_name}</span>
                    <StatusBadge status={patient.case_sheet_status} />
                  </p>
                  <p className="text-xs text-slate-500">
                    {patient.patient_id} · added {formatDateTime(patient.created_at)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

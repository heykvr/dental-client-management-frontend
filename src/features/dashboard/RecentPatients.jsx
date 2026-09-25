import { Link } from 'react-router-dom'

import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import PatientAvatar from '@/features/patients/PatientAvatar'
import { formatDateTime } from '@/lib/utils'

export default function RecentPatients({ patients }) {
  return (
    <Card title="Recent patients">
      {patients.length === 0 ? (
        <EmptyState title="No patients yet" description="Newly added patients appear here." />
      ) : (
        <ul className="divide-y divide-slate-100">
          {patients.map((patient) => (
            <li key={patient.patient_id}>
              <Link
                to={`/patients/${patient.patient_id}`}
                className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-slate-50"
              >
                <PatientAvatar patient={patient} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-900">{patient.full_name}</p>
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

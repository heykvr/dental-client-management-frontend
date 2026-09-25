import { CalendarDays, MapPin, Phone, User } from 'lucide-react'

import PatientAvatar from '@/features/patients/PatientAvatar'
import { capitalize, formatDate, formatDateTime } from '@/lib/utils'

// The patient header from the mockup (avatar, name, ID, age, gender), as a gradient banner,
// with phone, address and registration date.
export default function PatientHeader({ patient, action }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <div className="bg-linear-to-r from-blue-600 via-blue-500 to-teal-500 px-5 py-6 text-white sm:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="rounded-full ring-4 ring-white/30">
            <PatientAvatar patient={patient} size="lg" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-bold tracking-tight">{patient.full_name}</h1>
            <p className="text-sm text-blue-50">Patient ID: {patient.patient_id}</p>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
      <div className="grid gap-4 px-5 py-4 text-sm sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <Detail
          icon={CalendarDays}
          label="Age"
          value={`${patient.age} years`}
          hint={formatDate(patient.date_of_birth)}
        />
        <Detail icon={User} label="Gender" value={capitalize(patient.gender)} />
        <Detail icon={Phone} label="Phone" value={patient.phone} />
        <Detail
          icon={MapPin}
          label="Address"
          value={patient.address}
          hint={`Registered ${formatDateTime(patient.created_at)}`}
        />
      </div>
    </div>
  )
}

function Detail({ icon: Icon, label, value, hint }) {
  return (
    <div className="flex items-start gap-3">
      <span className="rounded-lg bg-slate-100 p-2 text-slate-500">
        <Icon size={16} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="truncate font-medium text-slate-900">{value}</p>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
    </div>
  )
}

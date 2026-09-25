import { CalendarDays, MapPin, Phone, User } from 'lucide-react'

import PatientAvatar from '@/features/patients/PatientAvatar'
import { capitalize, formatDate, formatDateTime } from '@/lib/utils'

// The header card from the mockup: avatar, name, patient ID, age, gender, phone,
// with address and registration date on a second line.
export default function PatientHeader({ patient, action }) {
  return (
    <div className="space-y-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-4">
          <PatientAvatar patient={patient} size="lg" />
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{patient.full_name}</h1>
            <p className="text-sm text-slate-500">Patient ID: {patient.patient_id}</p>
          </div>
        </div>
        <Detail
          icon={CalendarDays}
          label="Age"
          value={`${patient.age} years`}
          hint={formatDate(patient.date_of_birth)}
        />
        <Detail icon={User} label="Gender" value={capitalize(patient.gender)} />
        <Detail icon={Phone} label="Phone" value={patient.phone} />
        {action && <div className="ml-auto">{action}</div>}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-blue-100 pt-3 text-sm text-slate-600">
        <span className="flex items-center gap-1.5">
          <MapPin size={16} className="text-slate-400" /> {patient.address}
        </span>
        <span className="text-slate-400">Registered {formatDateTime(patient.created_at)}</span>
      </div>
    </div>
  )
}

function Detail({ icon: Icon, label, value, hint }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={20} className="text-slate-400" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-medium text-slate-900">
          {value}
          {hint && <span className="ml-1 text-xs font-normal text-slate-400">({hint})</span>}
        </p>
      </div>
    </div>
  )
}

import { initials } from '@/lib/utils'

const SIZES = { sm: 'h-9 w-9 text-sm', lg: 'h-14 w-14 text-lg' }

// Soft colours so patients are easy to tell apart at a glance
const COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
]

// Same patient ID -> always the same colour
function colorFor(patientId = '') {
  const sum = [...patientId].reduce((total, char) => total + char.charCodeAt(0), 0)
  return COLORS[sum % COLORS.length]
}

// Round badge with the patient's initials, e.g. "AR" (as in the mockup)
export default function PatientAvatar({ patient, size = 'sm' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${SIZES[size]} ${colorFor(patient.patient_id)}`}
    >
      {initials(patient)}
    </span>
  )
}

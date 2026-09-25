import { initials } from '@/lib/utils'

const SIZES = { sm: 'h-9 w-9 text-sm', lg: 'h-14 w-14 text-lg' }

// Round badge with the patient's initials, e.g. "AR" (as in the mockup)
export default function PatientAvatar({ patient, size = 'sm' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700 ${SIZES[size]}`}
    >
      {initials(patient)}
    </span>
  )
}

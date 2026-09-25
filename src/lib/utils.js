// Small display helpers. All dates and times are shown in IST (see DECISIONS.md).
export const APP_TIME_ZONE = 'Asia/Kolkata'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "2002-05-14" -> "14 May 2002". DOB is a calendar date, so no timezone conversion.
export function formatDate(isoDate) {
  if (!isoDate) return '—'
  const [year, month, day] = isoDate.split('-').map(Number)
  return `${day} ${MONTHS[month - 1]} ${year}`
}

// "2026-09-25T15:39:48.991+05:30" -> "25 Sep 2026, 3:39 pm" (IST)
export function formatDateTime(isoDateTime) {
  if (!isoDateTime) return '—'
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: APP_TIME_ZONE,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(isoDateTime))
}

// Today's date in IST as "YYYY-MM-DD" (used to block future dates of birth)
export function todayInIST() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: APP_TIME_ZONE }).format(new Date())
}

export function initials(patient) {
  return [patient.first_name, patient.last_name]
    .filter(Boolean)
    .map((name) => name[0].toUpperCase())
    .join('')
}

export function capitalize(text) {
  return text ? text[0].toUpperCase() + text.slice(1) : ''
}

// Chart label for a trend period: "2026-09" -> "Sep 26" (or "Sep" within one year), "2026-09-05" -> "5"
export function periodLabel(period, granularity, showYear = true) {
  const [year, month, day] = period.split('-')
  if (granularity === 'day') return String(Number(day))
  const name = MONTHS[Number(month) - 1]
  return showYear ? `${name} ${year.slice(2)}` : name
}

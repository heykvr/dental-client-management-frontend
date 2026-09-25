import { useState } from 'react'

import { controlClass } from '@/components/ui/controlClass'
import Field from '@/components/ui/Field'
import { todayInIST } from '@/lib/utils'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] // prettier-ignore
const CURRENT_YEAR = Number(todayInIST().slice(0, 4))
const YEARS = Array.from({ length: 121 }, (_, i) => CURRENT_YEAR - i) // newest first, 120 years back
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

// Date of birth as three dropdowns (Day / Month / Year): much quicker than a calendar for
// dates decades ago. value/onChange use "YYYY-MM-DD" ('' until all three are picked).
export default function DateOfBirthSelect({ value, onChange, onBlur, error, required }) {
  const [year, month, day] = value ? value.split('-') : []
  // Remember partial picks (e.g. only the year) until the date is complete
  const [draft, setDraft] = useState({ day: day ?? '', month: month ?? '', year: year ?? '' })

  function update(part, partValue) {
    const next = { ...draft, [part]: partValue }
    setDraft(next)
    const complete = next.day && next.month && next.year
    const date = complete ? `${next.year}-${next.month}-${String(next.day).padStart(2, '0')}` : ''
    // An impossible date like 31 Feb is sent as '' so the form shows "Date of birth is required"
    onChange(complete && isRealDate(date) ? date : '')
  }

  const selectClass = controlClass(error)
  return (
    <Field label="Date of birth" htmlFor="dob-day" required={required} error={error}>
      <div className="grid grid-cols-[1fr_1.6fr_1.3fr] gap-2" onBlur={onBlur}>
        <select
          id="dob-day"
          aria-label="Day"
          value={draft.day}
          onChange={(e) => update('day', e.target.value)}
          className={selectClass}
        >
          <option value="">Day</option>
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          aria-label="Month"
          value={draft.month}
          onChange={(e) => update('month', e.target.value)}
          className={selectClass}
        >
          <option value="">Month</option>
          {MONTHS.map((name, index) => (
            <option key={name} value={String(index + 1).padStart(2, '0')}>
              {name}
            </option>
          ))}
        </select>
        <select
          aria-label="Year"
          value={draft.year}
          onChange={(e) => update('year', e.target.value)}
          className={selectClass}
        >
          <option value="">Year</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </Field>
  )
}

function isRealDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  return date.getUTCMonth() === m - 1 && date.getUTCDate() === d
}

import { z } from 'zod'

import { todayInIST } from '@/lib/utils'

// Same rules as the backend (app/schemas/patient.py), so users see errors before submitting.
// The backend still validates everything: this is only for a faster, friendlier form.
const MAX_AGE_YEARS = 120

function ageInYears(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number)
  const [ty, tm, td] = todayInIST().split('-').map(Number)
  return ty - y - (tm < m || (tm === m && td < d) ? 1 : 0)
}

export const patientSchema = z.object({
  first_name: z.string().trim().min(1, 'First name is required').max(50, 'Max 50 characters'),
  last_name: z.string().trim().max(50, 'Max 50 characters'), // optional: single-name patients
  date_of_birth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((value) => value <= todayInIST(), 'Date of birth cannot be in the future') // ISO strings compare correctly
    .refine(
      (value) => ageInYears(value) <= MAX_AGE_YEARS,
      `Age cannot be more than ${MAX_AGE_YEARS} years`,
    ),
  gender: z.enum(['male', 'female', 'other'], { message: 'Select a gender' }),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => /^\+?\d{10,15}$/.test(value.replace(/[\s\-()]/g, '')),
      'Phone must be 10-15 digits, optionally starting with +',
    ),
  address: z
    .string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(300, 'Max 300 characters'),
})

export const EMPTY_PATIENT = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
  gender: '',
  phone: '',
  address: '',
}

// Form values -> API body (empty last name is sent as null)
export function toPatientPayload(values) {
  return { ...values, last_name: values.last_name || null }
}

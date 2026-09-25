import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import { EMPTY_PATIENT, patientSchema, toPatientPayload } from '@/features/patients/patientSchema'
import { todayInIST } from '@/lib/utils'

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

// One form for both "Add patient" and "Edit patient". The parent decides what happens on
// submit (create or update); if the API rejects fields (422), they are shown on the inputs.
export default function PatientForm({
  defaultValues = EMPTY_PATIENT,
  submitLabel,
  onSubmit,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(patientSchema), defaultValues })

  async function submit(values) {
    try {
      await onSubmit(toPatientPayload(values))
    } catch (error) {
      const fieldErrors = Object.entries(error.fields ?? {})
      fieldErrors.forEach(([field, message]) => setError(field, { message }))
      if (fieldErrors.length === 0) setError('root', { message: error.message })
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="First name"
          required
          {...register('first_name')}
          error={errors.first_name?.message}
        />
        <Input label="Last name" {...register('last_name')} error={errors.last_name?.message} />
        <Input
          label="Date of birth"
          type="date"
          required
          max={todayInIST()}
          {...register('date_of_birth')}
          error={errors.date_of_birth?.message}
        />
        <Select
          label="Gender"
          required
          placeholder="Select gender"
          options={GENDERS}
          {...register('gender')}
          error={errors.gender?.message}
        />
      </div>
      <Input
        label="Phone"
        type="tel"
        required
        placeholder="+91 98765 43210"
        {...register('phone')}
        error={errors.phone?.message}
      />
      <Textarea
        label="Address"
        required
        rows={2}
        {...register('address')}
        error={errors.address?.message}
      />

      <ErrorMessage error={errors.root} />

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

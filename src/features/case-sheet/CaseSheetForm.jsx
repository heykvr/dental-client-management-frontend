import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useForm } from 'react-hook-form'

import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import { caseSheetSchema, toFormValues, toPayload } from '@/features/case-sheet/caseSheetSchema'
import Section from '@/features/case-sheet/Section'
import { useSaveCaseSheet } from '@/hooks/useCaseSheet'

const TENDERNESS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

// Edit mode of the case sheet: 3 numbered sections, as in the mockup. Drafts can be saved
// anytime; the * fields are needed to complete it (the server sets the status on every save).
// onDone: back to the read-only view (after saving or on Cancel).
export default function CaseSheetForm({ patientId, sheet, onDone }) {
  const saveCaseSheet = useSaveCaseSheet(patientId)
  const isNew = sheet.status === 'not_started'
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({ resolver: zodResolver(caseSheetSchema), defaultValues: toFormValues(sheet) })

  async function submit(values) {
    try {
      await saveCaseSheet.mutateAsync(toPayload(values))
      onDone() // stay on the profile; the AI summary card shows "Updating summary…"
    } catch (error) {
      // Server field errors use the same names as the form, e.g. "diagnosis.notes"
      const fieldErrors = Object.entries(error.fields ?? {})
      fieldErrors.forEach(([field, message]) => setError(field, { message }))
      if (fieldErrors.length === 0) setError('root', { message: error.message })
    }
  }

  const err = (section, field) => errors[section]?.[field]?.message

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
      <p className="text-xs text-slate-500">
        You can save a draft anytime. Fill the <span className="text-red-500">*</span> fields to
        complete the case sheet.
      </p>

      <Section number={1} title="Chief Complaint">
        <Textarea
          label="Chief complaint"
          required
          rows={2}
          {...register('chief_complaint.complaint')}
          error={err('chief_complaint', 'complaint')}
        />
        <Input
          label="Duration"
          placeholder="e.g. 3 days"
          {...register('chief_complaint.duration')}
          error={err('chief_complaint', 'duration')}
        />
      </Section>

      <Section number={2} title="Investigation">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Tooth / area"
            required
            placeholder="e.g. 46 - Lower Right First Molar"
            {...register('investigation.tooth_area')}
            error={err('investigation', 'tooth_area')}
          />
          <Select
            label="Tenderness"
            required
            placeholder="Select"
            options={TENDERNESS}
            {...register('investigation.tenderness')}
            error={err('investigation', 'tenderness')}
          />
        </div>
        <Input
          label="Clinical findings"
          required
          {...register('investigation.clinical_findings')}
          error={err('investigation', 'clinical_findings')}
        />
        <Input
          label="Sensitivity"
          placeholder="e.g. Sensitive to hot and cold"
          {...register('investigation.sensitivity')}
          error={err('investigation', 'sensitivity')}
        />
        <Textarea
          label="Additional findings"
          rows={2}
          {...register('investigation.additional_findings')}
          error={err('investigation', 'additional_findings')}
        />
      </Section>

      <Section number={3} title="Diagnosis">
        <Input
          label="Diagnosis"
          required
          {...register('diagnosis.diagnosis')}
          error={err('diagnosis', 'diagnosis')}
        />
        <Textarea
          label="Notes"
          rows={2}
          {...register('diagnosis.notes')}
          error={err('diagnosis', 'notes')}
        />
      </Section>

      <ErrorMessage error={errors.root} />

      <div className="flex items-center justify-end gap-3">
        {isDirty && <span className="text-xs text-amber-600">Unsaved changes</span>}
        <Button variant="secondary" onClick={onDone} disabled={isSubmitting}>
          Cancel
        </Button>
        {/* Disabled when nothing changed: no pointless request (the API allows 10/minute) */}
        <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
          <Save size={16} /> {isNew ? 'Save Case Sheet' : 'Update Case Sheet'}
        </Button>
      </div>
    </form>
  )
}

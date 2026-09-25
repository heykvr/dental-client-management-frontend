import { z } from 'zod'

// Drafts are allowed: every field is optional to SAVE (only length limits, as in the backend).
// The * fields are only required to COMPLETE the case sheet; the server decides the status.
const text = (max) => z.string().max(max, `Max ${max} characters`)

export const caseSheetSchema = z.object({
  chief_complaint: z.object({
    complaint: text(1000),
    duration: text(100),
  }),
  investigation: z.object({
    tooth_area: text(200),
    clinical_findings: text(1000),
    tenderness: z.enum(['', 'yes', 'no']), // dropdown values; the API uses true / false / null
    sensitivity: text(500),
    additional_findings: text(1000),
  }),
  diagnosis: z.object({
    diagnosis: text(1000),
    notes: text(1000),
  }),
})

// API case sheet -> form values (inputs need '' instead of null)
export function toFormValues(sheet) {
  const { chief_complaint: cc, investigation: inv, diagnosis: dx } = sheet
  return {
    chief_complaint: { complaint: cc.complaint ?? '', duration: cc.duration ?? '' },
    investigation: {
      tooth_area: inv.tooth_area ?? '',
      clinical_findings: inv.clinical_findings ?? '',
      tenderness: inv.tenderness === true ? 'yes' : inv.tenderness === false ? 'no' : '',
      sensitivity: inv.sensitivity ?? '',
      additional_findings: inv.additional_findings ?? '',
    },
    diagnosis: { diagnosis: dx.diagnosis ?? '', notes: dx.notes ?? '' },
  }
}

// Form values -> API body (empty text -> null, "yes"/"no" -> true/false)
export function toPayload(values) {
  const clean = (section) =>
    Object.fromEntries(Object.entries(section).map(([key, value]) => [key, value.trim() || null]))
  const { tenderness, ...investigation } = values.investigation
  return {
    chief_complaint: clean(values.chief_complaint),
    investigation: {
      ...clean(investigation),
      tenderness: tenderness === 'yes' ? true : tenderness === 'no' ? false : null,
    },
    diagnosis: clean(values.diagnosis),
  }
}

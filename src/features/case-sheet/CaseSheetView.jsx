import { isRequired } from '@/features/case-sheet/caseSheetSchema'
import Section from '@/features/case-sheet/Section'
import { SECTION_ICONS } from '@/features/case-sheet/sectionIcons'

// Read-only case sheet: what is saved. Empty optional fields show "Not recorded";
// empty required fields are highlighted as "Needed to complete".
export default function CaseSheetView({ sheet }) {
  const { chief_complaint: cc, investigation: inv, diagnosis: dx } = sheet
  const tenderness = inv.tenderness === true ? 'Yes' : inv.tenderness === false ? 'No' : null

  return (
    <div className="space-y-4">
      <Section number={1} title="Chief Complaint" icon={SECTION_ICONS.chief_complaint}>
        <Row
          section="chief_complaint"
          field="complaint"
          label="Chief complaint"
          value={cc.complaint}
        />
        <Row section="chief_complaint" field="duration" label="Duration" value={cc.duration} />
      </Section>
      <Section number={2} title="Investigation" icon={SECTION_ICONS.investigation}>
        <Row
          section="investigation"
          field="tooth_area"
          label="Tooth / area"
          value={inv.tooth_area}
        />
        <Row
          section="investigation"
          field="clinical_findings"
          label="Clinical findings"
          value={inv.clinical_findings}
        />
        <Row section="investigation" field="tenderness" label="Tenderness" value={tenderness} />
        <Row
          section="investigation"
          field="sensitivity"
          label="Sensitivity"
          value={inv.sensitivity}
        />
        <Row
          section="investigation"
          field="additional_findings"
          label="Additional findings"
          value={inv.additional_findings}
        />
      </Section>
      <Section number={3} title="Diagnosis" icon={SECTION_ICONS.diagnosis}>
        <Row section="diagnosis" field="diagnosis" label="Diagnosis" value={dx.diagnosis} />
        <Row section="diagnosis" field="notes" label="Notes" value={dx.notes} />
      </Section>
    </div>
  )
}

function Row({ section, field, label, value }) {
  const required = isRequired(section, field)
  return (
    <div className="grid gap-1 text-sm sm:grid-cols-[10rem_1fr]">
      <span className="text-slate-500">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {value ? (
        <span className="whitespace-pre-wrap text-slate-900">{value}</span>
      ) : required ? (
        <span className="w-fit rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
          Needed to complete
        </span>
      ) : (
        <span className="text-slate-400 italic">Not recorded</span>
      )}
    </div>
  )
}

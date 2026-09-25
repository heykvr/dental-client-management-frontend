import Section from '@/features/case-sheet/Section'

// Read-only case sheet: what is saved, with "Not recorded" for empty fields.
export default function CaseSheetView({ sheet }) {
  const { chief_complaint: cc, investigation: inv, diagnosis: dx } = sheet
  const tenderness = inv.tenderness === true ? 'Yes' : inv.tenderness === false ? 'No' : null

  return (
    <div className="space-y-4">
      <Section number={1} title="Chief Complaint">
        <Row label="Chief complaint" value={cc.complaint} />
        <Row label="Duration" value={cc.duration} />
      </Section>
      <Section number={2} title="Investigation">
        <Row label="Tooth / area" value={inv.tooth_area} />
        <Row label="Clinical findings" value={inv.clinical_findings} />
        <Row label="Tenderness" value={tenderness} />
        <Row label="Sensitivity" value={inv.sensitivity} />
        <Row label="Additional findings" value={inv.additional_findings} />
      </Section>
      <Section number={3} title="Diagnosis">
        <Row label="Diagnosis" value={dx.diagnosis} />
        <Row label="Notes" value={dx.notes} />
      </Section>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="grid gap-1 text-sm sm:grid-cols-[10rem_1fr]">
      <span className="text-slate-500">{label}</span>
      {value ? (
        <span className="whitespace-pre-wrap text-slate-900">{value}</span>
      ) : (
        <span className="text-slate-400 italic">Not recorded</span>
      )}
    </div>
  )
}

import FloatingAddButton from '@/components/ui/FloatingAddButton'
import PageHeader from '@/components/ui/PageHeader'
import PatientList from '@/features/patients/PatientList'

// Patient list: search, case sheet status at a glance, paging, floating "Add Patient".
export default function PatientsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Patients" description="Search, open a profile, or add a new patient" />
      <PatientList />
      <FloatingAddButton />
    </div>
  )
}

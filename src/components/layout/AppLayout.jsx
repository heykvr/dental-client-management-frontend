import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '@/components/layout/Sidebar'
import TopBar from '@/components/layout/TopBar'
import Spinner from '@/components/ui/Spinner'
import AddPatientModal from '@/features/patients/AddPatientModal'
import { useServerWaking } from '@/hooks/useServerWaking'

// Every page renders inside this: sidebar on the left (desktop), top bar, page content.
// It owns the single "Add patient" popup; pages open it with useOutletContext().openAddPatient.
export default function AppLayout() {
  const waking = useServerWaking()
  const [addOpen, setAddOpen] = useState(false)
  const openAddPatient = () => setAddOpen(true)

  return (
    <div className="min-h-screen">
      <Sidebar onAddPatient={openAddPatient} />
      <div className="lg:pl-64">
        <TopBar onAddPatient={openAddPatient} />
        {waking && (
          // Render's free tier sleeps when idle; the first request can take ~50 s
          <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-800">
            <Spinner
              size="sm"
              label="Waking up server… the first request can take up to a minute."
            />
          </div>
        )}
        <main className="mx-auto max-w-6xl px-4 pt-6 pb-24 lg:px-8">
          <Outlet context={{ openAddPatient }} />
        </main>
      </div>
      <AddPatientModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  )
}

import { Plus } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'

// Floating "Add Patient" button (as the spec asks); opens the popup owned by AppLayout
export default function FloatingAddButton() {
  const { openAddPatient } = useOutletContext()
  return (
    <button
      type="button"
      onClick={openAddPatient}
      className="fixed right-6 bottom-6 z-40 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-teal-500 px-5 py-3 font-medium text-white shadow-xl shadow-blue-600/30 transition hover:-translate-y-0.5 hover:shadow-2xl"
    >
      <Plus size={20} aria-hidden="true" />
      Add Patient
    </button>
  )
}

import { ClipboardCheck, ClipboardList, Plus, UserPlus, Users } from 'lucide-react'
import { useState } from 'react'

import ErrorMessage from '@/components/ui/ErrorMessage'
import Spinner from '@/components/ui/Spinner'
import RecentPatients from '@/features/dashboard/RecentPatients'
import RegistrationTrend from '@/features/dashboard/RegistrationTrend'
import StatCard from '@/features/dashboard/StatCard'
import AddPatientModal from '@/features/patients/AddPatientModal'
import PatientList from '@/features/patients/PatientList'
import { useDashboardStats } from '@/hooks/useDashboard'

export default function DashboardPage() {
  const [addOpen, setAddOpen] = useState(false)
  const stats = useDashboardStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Overview of patients and case sheets</p>
      </div>

      {stats.isError ? (
        <ErrorMessage error={stats.error} onRetry={stats.refetch} />
      ) : stats.isPending ? (
        <div className="py-10 text-center">
          <Spinner label="Loading dashboard…" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total patients" value={stats.data.total_patients} icon={Users} />
            <StatCard
              label="New this month"
              value={stats.data.new_patients_this_month}
              icon={UserPlus}
              color="violet"
            />
            <StatCard
              label="Completed case sheets"
              value={stats.data.completed_case_sheets}
              icon={ClipboardCheck}
              color="green"
            />
            <StatCard
              label="Pending case sheets"
              value={stats.data.pending_case_sheets}
              icon={ClipboardList}
              color="amber"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RegistrationTrend defaultTrend={stats.data.registration_trend} />
            </div>
            <RecentPatients patients={stats.data.recent_patients} />
          </div>
        </>
      )}

      <PatientList />

      {/* Floating "Add Patient" button (as the spec asks) */}
      <button
        type="button"
        onClick={() => setAddOpen(true)}
        className="fixed right-6 bottom-6 z-40 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-medium text-white shadow-lg hover:bg-blue-700"
      >
        <Plus size={20} />
        Add Patient
      </button>
      <AddPatientModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  )
}

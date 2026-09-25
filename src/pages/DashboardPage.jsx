import { ClipboardCheck, ClipboardList, UserPlus, Users } from 'lucide-react'

import ErrorMessage from '@/components/ui/ErrorMessage'
import FloatingAddButton from '@/components/ui/FloatingAddButton'
import PageHeader from '@/components/ui/PageHeader'
import Skeleton from '@/components/ui/Skeleton'
import RecentPatients from '@/features/dashboard/RecentPatients'
import RegistrationTrend from '@/features/dashboard/RegistrationTrend'
import StatCard from '@/features/dashboard/StatCard'
import { useDashboardStats } from '@/hooks/useDashboard'

const percent = (part, total) => (total ? Math.round((part / total) * 100) : 0)

export default function DashboardPage() {
  const stats = useDashboardStats()
  const data = stats.data

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of patients and case sheets" />

      {stats.isError ? (
        <ErrorMessage error={stats.error} onRetry={stats.refetch} />
      ) : stats.isPending ? (
        // Placeholders shaped like the cards and chart, so nothing jumps when data arrives
        <div className="space-y-6" aria-label="Loading dashboard">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            <Skeleton className="h-80 rounded-2xl xl:col-span-2" />
            <Skeleton className="h-80 rounded-2xl" />
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total patients"
              value={data.total_patients}
              hint="Registered in the clinic"
              icon={Users}
              color="blue"
            />
            <StatCard
              label="New this month"
              value={data.new_patients_this_month}
              hint="Registered this month (IST)"
              icon={UserPlus}
              color="violet"
            />
            <StatCard
              label="Completed case sheets"
              value={data.completed_case_sheets}
              hint={`${percent(data.completed_case_sheets, data.total_patients)}% of patients`}
              icon={ClipboardCheck}
              color="green"
            />
            <StatCard
              label="Pending case sheets"
              value={data.pending_case_sheets}
              hint="Not started or incomplete"
              icon={ClipboardList}
              color="amber"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RegistrationTrend defaultTrend={data.registration_trend} />
            </div>
            <RecentPatients patients={data.recent_patients} />
          </div>
        </>
      )}

      <FloatingAddButton />
    </div>
  )
}

import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import Card from '@/components/ui/Card'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Spinner from '@/components/ui/Spinner'
import { useRegistrationTrend } from '@/hooks/useDashboard'
import { periodLabel } from '@/lib/utils'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] // prettier-ignore
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i)

// Registrations chart. No filter: last 6 months (comes with /dashboard/stats).
// Year: 12 months of that year. Year + month: one bar per day (IST, from /dashboard/trend).
export default function RegistrationTrend({ defaultTrend }) {
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const filtered = useRegistrationTrend({ year, month })

  const trend = year ? filtered.data : defaultTrend
  const data = (trend?.points ?? []).map((point) => ({
    label: periodLabel(point.period, trend.granularity, !year),
    count: point.count,
  }))

  const filters = (
    <div className="flex gap-2">
      <select
        aria-label="Year"
        value={year}
        onChange={(e) => {
          setYear(e.target.value)
          setMonth('')
        }}
        className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
      >
        <option value="">Last 6 months</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <select
        aria-label="Month"
        value={month}
        disabled={!year}
        onChange={(e) => setMonth(e.target.value)}
        className="rounded-lg border border-slate-300 px-2 py-1 text-sm disabled:bg-slate-50 disabled:text-slate-400"
      >
        <option value="">All months</option>
        {MONTH_NAMES.map((name, index) => (
          <option key={name} value={index + 1}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <Card
      title="Patient registrations"
      subtitle={
        !year
          ? 'Last 6 months'
          : month
            ? `Each day of ${MONTH_NAMES[month - 1]} ${year}`
            : `${year}, by month`
      }
      action={filters}
    >
      {year && filtered.isError ? (
        <ErrorMessage error={filtered.error} onRetry={filtered.refetch} />
      ) : year && filtered.isPending ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner label="Loading chart…" />
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              {/* Blue -> teal gradient for the bars */}
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: '#64748b' }}
                interval="preserveStartEnd"
              />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip
                formatter={(value) => [value, 'Registrations']}
                cursor={{ fill: '#eff6ff' }}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgb(0 0 0 / 0.08)',
                }}
              />
              <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}

import { useQuery } from '@tanstack/react-query'

import { getDashboardStats, getRegistrationTrend } from '@/api/dashboard'

export function useDashboardStats() {
  return useQuery({ queryKey: ['dashboard', 'stats'], queryFn: getDashboardStats })
}

// Only runs when a year is chosen; without a filter the chart uses the trend from /stats.
export function useRegistrationTrend({ year, month }) {
  return useQuery({
    queryKey: ['dashboard', 'trend', { year, month }],
    queryFn: () => getRegistrationTrend({ year, month }),
    enabled: Boolean(year),
  })
}

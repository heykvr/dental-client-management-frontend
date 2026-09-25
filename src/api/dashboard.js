import { api } from '@/api/client'

export async function getDashboardStats() {
  const { data } = await api.get('/dashboard/stats')
  return data
}

// year only -> one point per month of that year; year + month -> one point per day
export async function getRegistrationTrend({ year, month }) {
  const { data } = await api.get('/dashboard/trend', {
    params: { year: year || undefined, month: month || undefined },
  })
  return data // { granularity: 'month' | 'day', points: [{ period, count }] }
}

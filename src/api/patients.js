import { api } from '@/api/client'

// sort: 'created_at' (newest, default) | 'name' | 'patient_id' | 'status'; order: 'asc' | 'desc'
export async function listPatients({ search = '', page = 1, limit = 10, sort, order }) {
  const { data } = await api.get('/patients', {
    params: { search: search || undefined, page, limit, sort, order },
  })
  return data // { items, total, page, limit }
}

export async function getPatient(patientId) {
  const { data } = await api.get(`/patients/${patientId}`)
  return data
}

export async function createPatient(patient) {
  const { data } = await api.post('/patients', patient)
  return data
}

export async function updatePatient(patientId, changes) {
  const { data } = await api.put(`/patients/${patientId}`, changes)
  return data
}

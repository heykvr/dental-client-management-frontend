import { api } from '@/api/client'

export async function listPatients({ search = '', page = 1, limit = 10 }) {
  const { data } = await api.get('/patients', {
    params: { search: search || undefined, page, limit },
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

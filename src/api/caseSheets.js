import { api } from '@/api/client'

// The case sheet (3 sections + status + AI summary) of one patient
export async function getCaseSheet(patientId) {
  const { data } = await api.get(`/patients/${patientId}/case-sheet`)
  return data
}

// sections: any of { chief_complaint, investigation, diagnosis }; the server recalculates the
// status and starts a new AI summary in the background if the content changed
export async function saveCaseSheet(patientId, sections) {
  const { data } = await api.put(`/patients/${patientId}/case-sheet`, sections)
  return data
}

// Regenerate / Retry the AI summary now (waits for the result)
export async function generateSummary(patientId) {
  const { data } = await api.post(`/patients/${patientId}/summary`)
  return data // the updated case sheet
}

import { api } from '@/api/client'

// Stateless chat: we send the recent conversation with every question; the server
// answers only from this patient's record and stores nothing.
export async function sendChatMessage(patientId, { message, history }) {
  const { data } = await api.post(`/patients/${patientId}/chat`, { message, history })
  return data // { reply }
}

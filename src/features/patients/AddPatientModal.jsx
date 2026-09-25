import { useNavigate } from 'react-router-dom'

import Modal from '@/components/ui/Modal'
import { useToast } from '@/components/ui/toastContext'
import PatientForm from '@/features/patients/PatientForm'
import { useCreatePatient } from '@/hooks/usePatients'

// Popup to register a patient. The backend gives the ID (PAT-0001, …) and creates an empty
// case sheet; on success we open the new patient's profile to fill it in.
export default function AddPatientModal({ open, onClose }) {
  const navigate = useNavigate()
  const createPatient = useCreatePatient()
  const toast = useToast()

  async function handleSubmit(payload) {
    const patient = await createPatient.mutateAsync(payload)
    onClose()
    toast.success(`${patient.full_name} added as ${patient.patient_id}`)
    navigate(`/patients/${patient.patient_id}`)
  }

  return (
    <Modal open={open} title="Add patient" onClose={onClose}>
      {open && <PatientForm submitLabel="Add patient" onSubmit={handleSubmit} onCancel={onClose} />}
    </Modal>
  )
}

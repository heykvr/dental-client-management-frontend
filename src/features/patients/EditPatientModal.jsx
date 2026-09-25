import Modal from '@/components/ui/Modal'
import { useToast } from '@/components/ui/toastContext'
import PatientForm from '@/features/patients/PatientForm'
import { useUpdatePatient } from '@/hooks/usePatients'

const EDITABLE = ['first_name', 'last_name', 'date_of_birth', 'gender', 'phone', 'address']

// The backend stores phones without spaces/dashes, so compare them the same way
const normalizePhone = (phone) => phone.replace(/[\s\-()]/g, '')

// Only the fields the user actually changed (the API accepts partial updates)
function changedFields(patient, payload) {
  const changes = {}
  for (const field of EDITABLE) {
    const before = patient[field] ?? null
    const after = payload[field] ?? null
    const same =
      field === 'phone'
        ? normalizePhone(before ?? '') === normalizePhone(after ?? '')
        : before === after
    if (!same) changes[field] = after
  }
  return changes
}

// Same form as "Add patient", pre-filled. The patient ID is never editable.
export default function EditPatientModal({ patient, open, onClose }) {
  const updatePatient = useUpdatePatient(patient.patient_id)
  const toast = useToast()

  async function handleSubmit(payload) {
    const changes = changedFields(patient, payload)
    // Nothing changed: just close, no API call
    if (Object.keys(changes).length > 0) {
      await updatePatient.mutateAsync(changes)
      toast.success('Patient details updated')
    }
    onClose()
  }

  return (
    <Modal open={open} title={`Edit patient · ${patient.patient_id}`} onClose={onClose}>
      {open && (
        <PatientForm
          defaultValues={{
            first_name: patient.first_name,
            last_name: patient.last_name ?? '',
            date_of_birth: patient.date_of_birth,
            gender: patient.gender,
            phone: patient.phone,
            address: patient.address,
          }}
          submitLabel="Update changes"
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      )}
    </Modal>
  )
}

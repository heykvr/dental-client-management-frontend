import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createPatient, getPatient, listPatients, updatePatient } from '@/api/patients'

export function usePatients({ search, page, limit, sort, order }) {
  return useQuery({
    queryKey: ['patients', { search, page, limit, sort, order }],
    queryFn: () => listPatients({ search, page, limit, sort, order }),
    placeholderData: keepPreviousData, // keep the old page visible while the next one loads
  })
}

export function usePatient(patientId) {
  return useQuery({
    queryKey: ['patient', patientId],
    queryFn: () => getPatient(patientId),
  })
}

// Put a patient we already have (from the list, or just created) into the cache, so their
// profile opens instantly instead of waiting for another request.
export function usePrefillPatient() {
  const queryClient = useQueryClient()
  return (patient) => queryClient.setQueryData(['patient', patient.patient_id], patient)
}

export function useCreatePatient() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPatient,
    onSuccess: (patient) => {
      queryClient.setQueryData(['patient', patient.patient_id], patient)
      // The list and the dashboard numbers changed: refetch them
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useUpdatePatient(patientId) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (changes) => updatePatient(patientId, changes),
    onSuccess: (patient) => {
      queryClient.setQueryData(['patient', patientId], patient)
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] }) // recent patients show names
      queryClient.invalidateQueries({ queryKey: ['case-sheet', patientId] }) // AI summary may refresh
    },
  })
}

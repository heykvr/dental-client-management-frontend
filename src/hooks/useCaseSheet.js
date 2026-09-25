import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { generateSummary, getCaseSheet, saveCaseSheet } from '@/api/caseSheets'

// While the AI summary is being written in the background, check again every 6 s
// (it usually takes ~3 s). Stops as soon as it is ready or failed. 6 s keeps us well
// inside the API limit of 10 requests/minute.
const SUMMARY_POLL_MS = 6000

export function useCaseSheet(patientId) {
  return useQuery({
    queryKey: ['case-sheet', patientId],
    queryFn: () => getCaseSheet(patientId),
    refetchInterval: (query) =>
      query.state.data?.ai_summary?.state === 'generating' ? SUMMARY_POLL_MS : false,
  })
}

export function useSaveCaseSheet(patientId) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (sections) => saveCaseSheet(patientId, sections),
    onSuccess: (sheet) => {
      // Show the saved sheet at once (new status, "Updating summary…"); polling starts
      queryClient.setQueryData(['case-sheet', patientId], sheet)
      queryClient.invalidateQueries({ queryKey: ['dashboard'] }) // completed/pending counts
    },
  })
}

export function useGenerateSummary(patientId) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => generateSummary(patientId),
    onSuccess: (sheet) => queryClient.setQueryData(['case-sheet', patientId], sheet),
  })
}

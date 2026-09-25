import { QueryClient } from '@tanstack/react-query'

// React Query caches server data and gives every screen loading / error / data states.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // reuse data for 30 s: fewer requests (the API allows 10/minute)
      refetchOnWindowFocus: false,
      retry: false, // errors are shown with a "Try again" button instead
    },
  },
})

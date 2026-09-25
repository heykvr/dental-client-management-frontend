import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import ErrorBoundary from '@/components/layout/ErrorBoundary'
import { queryClient } from '@/lib/queryClient'
import { router } from '@/routes'

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

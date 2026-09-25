import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import ErrorBoundary from '@/components/layout/ErrorBoundary'
import ToastProvider from '@/components/ui/Toast'
import { queryClient } from '@/lib/queryClient'
import { router } from '@/routes'

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

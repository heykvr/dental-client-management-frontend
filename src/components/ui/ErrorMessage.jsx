import { AlertCircle } from 'lucide-react'

import Button from '@/components/ui/Button'

// Shows an ApiError's user-friendly message, with an optional "Try again" button.
export default function ErrorMessage({ error, onRetry }) {
  if (!error) return null
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
    >
      <AlertCircle size={18} className="mt-0.5 shrink-0" />
      <p className="flex-1">{error.message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="py-1!">
          Try again
        </Button>
      )}
    </div>
  )
}

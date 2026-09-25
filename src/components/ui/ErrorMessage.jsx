import { AlertCircle } from 'lucide-react'

import Button from '@/components/ui/Button'
import { useSecondsLeft } from '@/hooks/useSecondsLeft'

// "Too many requests" with a live countdown (429 errors carry retryAt)
function rateLimitMessage(secondsLeft) {
  if (secondsLeft === 0) return 'Too many requests. You can try again now.'
  return `Too many requests. Please try again in ${secondsLeft} second${secondsLeft === 1 ? '' : 's'}.`
}

// Shows an ApiError's user-friendly message, with an optional "Try again" button.
export default function ErrorMessage({ error, onRetry }) {
  const secondsLeft = useSecondsLeft(error?.retryAt)
  if (!error) return null
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
    >
      <AlertCircle size={18} className="mt-0.5 shrink-0" />
      <p className="flex-1">{error.retryAt ? rateLimitMessage(secondsLeft) : error.message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} disabled={secondsLeft > 0} className="py-1!">
          Try again
        </Button>
      )}
    </div>
  )
}

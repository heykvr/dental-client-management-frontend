import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { ToastContext } from '@/components/ui/toastContext'

const STYLES = {
  success: { icon: CheckCircle2, className: 'border-emerald-200 bg-white text-emerald-800' },
  error: { icon: AlertCircle, className: 'border-red-200 bg-white text-red-700' },
}

// Small pop-up messages in the bottom-left corner ("Patient added", "Case sheet updated").
// Any component can show one with: const toast = useToast(); toast.success('Saved')
export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => setToasts((all) => all.filter((t) => t.id !== id)), [])

  const show = useCallback(
    (type, message) => {
      const id = crypto.randomUUID()
      setToasts((all) => [...all.slice(-2), { id, type, message }]) // at most 3 on screen
      setTimeout(() => dismiss(id), 4000)
    },
    [dismiss],
  )

  const api = useMemo(
    () => ({
      success: (message) => show('success', message),
      error: (message) => show('error', message),
    }),
    [show],
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-6 left-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2"
      >
        {toasts.map(({ id, type, message }) => {
          const { icon: Icon, className } = STYLES[type]
          return (
            <div
              key={id}
              role="status"
              className={`animate-toast-in flex items-start gap-3 rounded-xl border p-3 text-sm shadow-lg ${className}`}
            >
              <Icon size={18} className="mt-0.5 shrink-0" />
              <p className="flex-1">{message}</p>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => dismiss(id)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

// A simple popup: dark backdrop, white card, closes on Esc or the X button.
export default function Modal({ open, title, onClose, children }) {
  const dialogRef = useRef(null)

  // Close on Esc
  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // When it opens (only then), put the cursor in the first field so keyboard users
  // start inside the popup
  useEffect(() => {
    if (!open) return
    const first = dialogRef.current?.querySelector('input, select, textarea')
    ;(first ?? dialogRef.current)?.focus()
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

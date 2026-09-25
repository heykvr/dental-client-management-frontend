import { CheckCircle2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Green confirmation passed from the previous page, e.g.
// navigate('/', { state: { flash: 'Case sheet saved' } }). Hides itself after 5 s.
export default function FlashMessage() {
  const location = useLocation()
  const navigate = useNavigate()
  // Read once when the page opens (the dashboard mounts fresh after navigating to it)
  const [message, setMessage] = useState(location.state?.flash)

  useEffect(() => {
    // Clear it from browser history, so a page refresh doesn't show it again
    if (location.state?.flash) navigate(location.pathname, { replace: true, state: null })
  }, [location.state, location.pathname, navigate])

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(null), 5000)
    return () => clearTimeout(timer)
  }, [message])

  if (!message) return null
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
    >
      <CheckCircle2 size={18} className="shrink-0" />
      <p className="flex-1">{message}</p>
      <button type="button" aria-label="Dismiss" onClick={() => setMessage(null)}>
        <X size={16} />
      </button>
    </div>
  )
}

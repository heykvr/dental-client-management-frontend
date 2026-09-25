import axios from 'axios'

// One axios instance for the whole app. The backend URL comes from .env (VITE_API_BASE_URL).
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  timeout: 90_000, // Render's free tier can take ~50 s to wake up
})

// Every failed request becomes an ApiError with a message that is safe to show to users.
// The backend always answers errors as { detail, code } (and 422 adds errors: [{field, message}]).
export class ApiError extends Error {
  constructor({ message, status = 0, code = 'NETWORK_ERROR', fields = {} }) {
    super(message)
    this.status = status
    this.code = code
    this.fields = fields // e.g. { phone: 'Phone must be 10-15 digits' } for form errors
  }
}

function toApiError(error) {
  if (!error.response) {
    return new ApiError({ message: "Can't reach the server. Check your connection and try again." })
  }
  const { status, data } = error.response
  const fields = Object.fromEntries((data?.errors ?? []).map((e) => [e.field, e.message]))
  return new ApiError({
    // For 429 the backend already says "Too many requests. Please try again in N seconds."
    message: data?.detail ?? 'Something went wrong. Please try again.',
    status,
    code: data?.code ?? 'UNKNOWN_ERROR',
    fields,
  })
}

// ---- "Waking up server…" -------------------------------------------------------------
// If any request is still running after 5 s, we tell the user the server is waking up.
// Components read this with the useServerWaking() hook (src/hooks/useServerWaking.js).
const SLOW_AFTER_MS = 5000
let slowRequests = 0
const listeners = new Set()

function setSlow(delta) {
  slowRequests += delta
  listeners.forEach((listener) => listener())
}

export const serverWaking = {
  subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  isWaking: () => slowRequests > 0,
}

api.interceptors.request.use((config) => {
  config.slowTimer = setTimeout(() => {
    config.markedSlow = true
    setSlow(+1)
  }, SLOW_AFTER_MS)
  return config
})

function finish(config) {
  if (!config) return
  clearTimeout(config.slowTimer)
  if (config.markedSlow) setSlow(-1)
}

api.interceptors.response.use(
  (response) => {
    finish(response.config)
    return response
  },
  (error) => {
    finish(error.config)
    return Promise.reject(toApiError(error))
  },
)

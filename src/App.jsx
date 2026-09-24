import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Temporary Day 1 page: proves frontend -> backend -> database connectivity.
// Replaced by the real layout and routes on Day 5.
function App() {
  const [health, setHealth] = useState({ state: 'loading' })

  useEffect(() => {
    fetch(`${API_BASE_URL}/health`)
      .then(async (res) => {
        const body = await res.json()
        setHealth(res.ok ? { state: 'ok', body } : { state: 'error', message: body.database })
      })
      .catch((err) => setHealth({ state: 'error', message: err.message }))
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md">
        <h1 className="text-xl font-semibold text-slate-900">Dental Patient Management</h1>
        <p className="mt-1 text-sm text-slate-500">{API_BASE_URL}</p>

        <div className="mt-6 text-sm font-medium">
          {health.state === 'loading' && <p className="text-slate-500">Checking API…</p>}
          {health.state === 'ok' && (
            <p className="text-green-600">
              API: {health.body.status} · Database: {health.body.database}
            </p>
          )}
          {health.state === 'error' && <p className="text-red-600">API error: {health.message}</p>}
        </div>
      </div>
    </main>
  )
}

export default App

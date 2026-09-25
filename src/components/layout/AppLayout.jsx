import { Outlet } from 'react-router-dom'

import Navbar from '@/components/layout/Navbar'
import Spinner from '@/components/ui/Spinner'
import { useServerWaking } from '@/hooks/useServerWaking'

// Every page renders inside this: navbar on top, page content (<Outlet />) below.
export default function AppLayout() {
  const waking = useServerWaking()

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      {waking && (
        // Render's free tier sleeps when idle; the first request can take ~50 s
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-800">
          <Spinner size="sm" label="Waking up server… the first request can take up to a minute." />
        </div>
      )}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

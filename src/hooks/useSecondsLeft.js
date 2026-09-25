import { useEffect, useState } from 'react'

// Whole seconds left until `until` (a ms timestamp), updated every second; 0 when passed.
export function useSecondsLeft(until) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!until) return
    const timer = setInterval(() => {
      setNow(Date.now())
      if (Date.now() >= until) clearInterval(timer)
    }, 1000)
    return () => clearInterval(timer)
  }, [until])

  return until ? Math.max(0, Math.ceil((until - now) / 1000)) : 0
}

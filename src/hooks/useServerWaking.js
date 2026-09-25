import { useSyncExternalStore } from 'react'

import { serverWaking } from '@/api/client'

// true while any API request has been running for more than 5 s (see src/api/client.js)
export function useServerWaking() {
  return useSyncExternalStore(serverWaking.subscribe, serverWaking.isWaking)
}

import { createContext, useContext } from 'react'

export const ToastContext = createContext(null)

// const toast = useToast(); toast.success('Patient added'); toast.error('Something failed')
export function useToast() {
  return useContext(ToastContext)
}

import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '@/components/layout/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import NotFoundPage from '@/pages/NotFoundPage'
import PatientProfilePage from '@/pages/PatientProfilePage'

// URL -> page. The dashboard also holds the patient list (the spec allows that).
export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/patients/:patientId', element: <PatientProfilePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

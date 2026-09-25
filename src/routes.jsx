import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '@/components/layout/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import NotFoundPage from '@/pages/NotFoundPage'
import PatientProfilePage from '@/pages/PatientProfilePage'
import PatientsPage from '@/pages/PatientsPage'

// URL -> page. All pages share the sidebar + top bar layout.
export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/patients', element: <PatientsPage /> },
      { path: '/patients/:patientId', element: <PatientProfilePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

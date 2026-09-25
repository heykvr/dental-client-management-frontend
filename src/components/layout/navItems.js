import { LayoutDashboard, Users } from 'lucide-react'

// Main navigation, shared by the desktop sidebar and the mobile top bar.
// match: which URLs light up the item (patient profiles belong to "Patients")
export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, match: (path) => path === '/' },
  {
    to: '/patients',
    label: 'Patients',
    icon: Users,
    match: (path) => path.startsWith('/patients'),
  },
]

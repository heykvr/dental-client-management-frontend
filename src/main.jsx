import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from '@/App.jsx'
import { removeExpiredChats } from '@/hooks/useChat'

// Delete chat conversations older than 30 minutes left on this computer
removeExpiredChats()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

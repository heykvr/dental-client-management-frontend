import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { sendChatMessage } from '@/api/chat'

// Conversation per patient, kept in localStorage for 30 minutes of inactivity (DECISIONS.md).
// Stored as chat:PAT-0001 -> { messages: [{ role, content }], lastActiveAt }
const KEY_PREFIX = 'chat:'
const TTL_MS = 30 * 60 * 1000
const HISTORY_SENT = 10 // the server also keeps only the last 10
const MAX_CHARS = 1000 // the server rejects longer history messages

const isExpired = (saved) => !saved?.lastActiveAt || Date.now() - saved.lastActiveAt > TTL_MS

// Storage can be blocked (private mode, settings): then the chat simply isn't remembered
function loadChat(patientId) {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY_PREFIX + patientId))
    if (isExpired(saved)) {
      localStorage.removeItem(KEY_PREFIX + patientId)
      return []
    }
    return saved.messages
  } catch {
    return []
  }
}

function saveChat(patientId, messages) {
  try {
    if (messages.length === 0) localStorage.removeItem(KEY_PREFIX + patientId)
    else
      localStorage.setItem(
        KEY_PREFIX + patientId,
        JSON.stringify({ messages, lastActiveAt: Date.now() }),
      )
  } catch {
    // ignore: storage unavailable
  }
}

// Called once when the app starts: delete every expired chat, not only the one being opened,
// so old conversations don't stay on a shared clinic computer.
export function removeExpiredChats() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(KEY_PREFIX))
      .forEach((key) => {
        let saved = null
        try {
          saved = JSON.parse(localStorage.getItem(key))
        } catch {
          // unreadable entry: treat as expired
        }
        if (isExpired(saved)) localStorage.removeItem(key)
      })
  } catch {
    // ignore: storage unavailable
  }
}

export function useChat(patientId) {
  const [messages, setMessages] = useState(() => loadChat(patientId))
  const mutation = useMutation({
    mutationFn: (body) => sendChatMessage(patientId, body),
  })

  async function send(text) {
    // Earlier turns go user/assistant pairs, so the last 10 always start with a user turn
    const history = messages
      .slice(-HISTORY_SENT)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
    const { reply } = await mutation.mutateAsync({ message: text, history })
    const next = [
      ...messages,
      { role: 'user', content: text },
      { role: 'assistant', content: reply },
    ]
    setMessages(next)
    saveChat(patientId, next)
  }

  function clear() {
    setMessages([])
    saveChat(patientId, [])
    mutation.reset()
  }

  return {
    messages,
    send,
    clear,
    isSending: mutation.isPending,
    pendingQuestion: mutation.isPending ? mutation.variables.message : null,
    error: mutation.error,
  }
}

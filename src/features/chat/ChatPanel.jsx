import { MessageCircle, Send, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Spinner from '@/components/ui/Spinner'
import ChatMessage from '@/features/chat/ChatMessage'
import { useChat } from '@/hooks/useChat'

// Example questions from the assignment
const SUGGESTIONS = [
  'What is the diagnosis?',
  'Summarize this patient',
  'Explain the diagnosis in simple terms',
  'What are the important findings?',
]

export default function ChatPanel({ patientId }) {
  const { messages, send, clear, isSending, pendingQuestion, error } = useChat(patientId)
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  // Keep the newest message in view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' })
  }, [messages.length, isSending])

  async function ask(question) {
    const trimmed = question.trim()
    if (!trimmed || isSending) return
    setText('')
    try {
      await send(trimmed)
    } catch {
      setText(trimmed) // failed (e.g. too many requests): put the question back to resend
    }
  }

  return (
    <section className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <h2 className="flex items-center gap-2 font-semibold text-slate-900">
          <MessageCircle size={18} className="text-blue-600" /> Ask about this patient
        </h2>
        {messages.length > 0 && (
          <Button variant="ghost" className="px-2! py-1! text-xs" onClick={clear}>
            <Trash2 size={14} /> Clear chat
          </Button>
        )}
      </div>

      <div className="h-80 space-y-3 overflow-y-auto px-5 py-4">
        {messages.length === 0 && !isSending && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500">Try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => ask(suggestion)}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700 hover:bg-blue-100"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <ChatMessage key={index} role={message.role}>
            {message.content}
          </ChatMessage>
        ))}
        {pendingQuestion && (
          <>
            <ChatMessage role="user">{pendingQuestion}</ChatMessage>
            <Spinner size="sm" label="Thinking…" />
          </>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="space-y-2 border-t border-slate-100 p-4">
        <ErrorMessage error={error} />
        <form
          onSubmit={(event) => {
            event.preventDefault()
            ask(text)
          }}
          className="flex gap-2"
        >
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            maxLength={1000}
            placeholder="Ask a question about this patient…"
            aria-label="Your question"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <Button type="submit" disabled={!text.trim()} loading={isSending} aria-label="Send">
            <Send size={16} />
          </Button>
        </form>
        <p className="text-xs text-slate-400">
          Answers use only this patient's record. AI-generated, review before use.
        </p>
      </div>
    </section>
  )
}

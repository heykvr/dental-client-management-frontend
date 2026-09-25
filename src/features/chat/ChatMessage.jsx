import { Check, Copy, Sparkles } from 'lucide-react'
import { useState } from 'react'

// One chat bubble: the dentist's questions on the right (blue), the assistant on the left
// with a small icon and a copy button (handy for pasting into notes).
export default function ChatMessage({ role, children }) {
  const mine = role === 'user'
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(String(children))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard blocked by the browser: nothing to do
    }
  }

  if (mine) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-blue-600 px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap text-white">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
        <Sparkles size={14} aria-hidden="true" />
      </span>
      <div className="group max-w-[85%]">
        <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
          {children}
        </div>
        <button
          type="button"
          onClick={copy}
          className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-600"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

// Three bouncing dots while the assistant is answering
export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2" role="status" aria-label="Assistant is typing">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-teal-700">
        <Sparkles size={14} aria-hidden="true" />
      </span>
      <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-3">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

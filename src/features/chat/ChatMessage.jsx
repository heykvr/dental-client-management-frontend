// One chat bubble: the dentist's questions on the right (blue), the assistant on the left.
export default function ChatMessage({ role, children }) {
  const mine = role === 'user'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
          mine
            ? 'rounded-br-sm bg-blue-600 text-white'
            : 'rounded-bl-sm bg-slate-100 text-slate-800'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

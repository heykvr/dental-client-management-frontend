// White rounded card with a soft shadow (the mockup's basic building block).
export default function Card({ title, action, className = '', children }) {
  return (
    <section className={`rounded-2xl border border-slate-100 bg-white p-5 shadow-sm ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="font-semibold text-slate-900">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

// White rounded card with a soft shadow (the app's basic building block).
export default function Card({ title, subtitle, action, className = '', children }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            {title && <h2 className="font-semibold text-slate-900">{title}</h2>}
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

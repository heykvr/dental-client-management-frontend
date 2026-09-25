// One numbered section card, like the mockup ("1 Chief Complaint", …), with an icon.
// Used by the read-only view and by the form.
export default function Section({ number, title, icon: Icon, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center gap-3 bg-blue-50/70 px-5 py-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
          {number}
        </span>
        <h3 className="flex-1 font-semibold text-blue-900">{title}</h3>
        {Icon && <Icon size={18} className="text-blue-400" aria-hidden="true" />}
      </div>
      <div className="space-y-4 p-5">{children}</div>
    </section>
  )
}

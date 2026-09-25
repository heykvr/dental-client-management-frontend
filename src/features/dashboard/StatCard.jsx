// Gradient icon tile per colour
const COLORS = {
  blue: 'from-blue-500 to-indigo-500 shadow-blue-500/25',
  green: 'from-emerald-500 to-teal-500 shadow-emerald-500/25',
  amber: 'from-amber-400 to-orange-500 shadow-amber-500/25',
  violet: 'from-violet-500 to-fuchsia-500 shadow-violet-500/25',
}

// One dashboard number: gradient icon, big value, label and a small hint underneath
export default function StatCard({ label, value, hint, icon: Icon, color = 'blue' }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-shadow hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className={`rounded-xl bg-linear-to-br p-2.5 text-white shadow-lg ${COLORS[color]}`}>
          <Icon size={22} aria-hidden="true" />
        </span>
      </div>
      {hint && <p className="mt-3 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

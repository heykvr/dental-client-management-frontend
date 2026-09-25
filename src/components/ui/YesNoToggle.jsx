import Field from '@/components/ui/Field'

// Two big buttons instead of a dropdown: one click to answer Yes or No.
// value: 'yes' | 'no' | ''   (click the selected one again to clear it)
export default function YesNoToggle({ label, required, value, onChange, error }) {
  const option = (optionValue, text) => {
    const selected = value === optionValue
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => onChange(selected ? '' : optionValue)}
        className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
          selected
            ? 'border-blue-600 bg-blue-600 text-white'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
        }`}
      >
        {text}
      </button>
    )
  }
  return (
    <Field label={label} required={required} error={error}>
      <div className="flex gap-2" role="group" aria-label={label}>
        {option('yes', 'Yes')}
        {option('no', 'No')}
      </div>
    </Field>
  )
}

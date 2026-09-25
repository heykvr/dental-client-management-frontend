import { controlClass } from '@/components/ui/controlClass'
import Field from '@/components/ui/Field'

// options: [{ value, label }]
export default function Select({
  label,
  id,
  required,
  error,
  hint,
  options,
  placeholder,
  ...props
}) {
  const selectId = id ?? props.name
  return (
    <Field label={label} htmlFor={selectId} required={required} error={error} hint={hint}>
      <select
        id={selectId}
        aria-invalid={Boolean(error)}
        className={controlClass(error)}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

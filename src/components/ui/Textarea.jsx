import { controlClass } from '@/components/ui/controlClass'
import Field from '@/components/ui/Field'

export default function Textarea({ label, id, required, error, hint, rows = 3, ...props }) {
  const textareaId = id ?? props.name
  return (
    <Field label={label} htmlFor={textareaId} required={required} error={error} hint={hint}>
      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={controlClass(error)}
        {...props}
      />
    </Field>
  )
}

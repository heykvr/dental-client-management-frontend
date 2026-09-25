import { controlClass } from '@/components/ui/controlClass'
import Field from '@/components/ui/Field'

// Works with react-hook-form: <Input label="Phone" {...register('phone')} error={errors.phone?.message} />
export default function Input({ label, id, required, error, hint, ...props }) {
  const inputId = id ?? props.name
  return (
    <Field label={label} htmlFor={inputId} required={required} error={error} hint={hint}>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={controlClass(error)}
        {...props}
      />
    </Field>
  )
}

// Shared Tailwind classes for inputs, selects and textareas (red border when invalid)
export function controlClass(error) {
  return `w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 disabled:bg-slate-50 ${
    error
      ? 'border-red-400 focus:ring-red-200'
      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
  }`
}

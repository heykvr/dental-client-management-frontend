// Grey pulsing placeholder shaped like the content that is loading (instead of a spinner),
// so the page doesn't jump when data arrives. e.g. <Skeleton className="h-4 w-32" />
export default function Skeleton({ className = '' }) {
  return (
    <div aria-hidden="true" className={`animate-pulse rounded-lg bg-slate-200/80 ${className}`} />
  )
}

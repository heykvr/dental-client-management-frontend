import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="py-20 text-center">
      <p className="text-5xl font-bold text-blue-600">404</p>
      <h1 className="mt-3 text-xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-1 text-slate-500">The page you are looking for doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block font-medium text-blue-600 hover:underline">
        Back to dashboard
      </Link>
    </div>
  )
}

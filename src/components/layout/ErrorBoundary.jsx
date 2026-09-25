import { Component } from 'react'

// Catches unexpected rendering crashes so users see a friendly message, not a blank page.
// (React only supports this as a class component.)
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unexpected UI error', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 p-6 text-center">
        <h1 className="text-xl font-semibold text-slate-900">Something went wrong</h1>
        <p className="text-slate-500">
          Please reload the page. If it keeps happening, try again later.
        </p>
        <button
          type="button"
          onClick={() => window.location.assign('/')}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Go to dashboard
        </button>
      </div>
    )
  }
}

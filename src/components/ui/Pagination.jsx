import { ChevronLeft, ChevronRight } from 'lucide-react'

import Button from '@/components/ui/Button'

// Previous / Next with "Page X of Y". Previous is disabled on the first page, Next on the last.
export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span>
        Page {page} of {totalPages}
      </span>
      <Button variant="secondary" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft size={16} /> Previous
      </Button>
      <Button variant="secondary" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Next <ChevronRight size={16} />
      </Button>
    </div>
  )
}

import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Pagination from '@/components/ui/Pagination'
import Skeleton from '@/components/ui/Skeleton'
import Spinner from '@/components/ui/Spinner'
import StatusBadge from '@/features/case-sheet/StatusBadge'
import PatientAvatar from '@/features/patients/PatientAvatar'
import SortableHeader from '@/features/patients/SortableHeader'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { usePatients, usePrefillPatient } from '@/hooks/usePatients'

const PAGE_SIZE = 10

// Sticky first column; the right border shows where the scrolling part starts (phones only)
const PINNED = 'sticky left-0 z-10 border-r border-slate-100 sm:border-r-0'

export default function PatientList() {
  const navigate = useNavigate()
  const prefillPatient = usePrefillPatient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  // Default: newest first. Clicking a column header sorts by it (server-side, across all pages)
  const [sort, setSort] = useState({ field: 'created_at', order: 'desc' })
  // Wait 250 ms after the last keystroke before searching (fewer API calls, still feels instant)
  const debouncedSearch = useDebouncedValue(search.trim(), 250)
  const { data, isPending, isError, error, refetch, isFetching } = usePatients({
    search: debouncedSearch,
    page,
    limit: PAGE_SIZE,
    sort: sort.field,
    order: sort.order,
  })

  function changeSort(field) {
    // Same column: flip the direction. New column: start A→Z / low→high / Not started first
    setSort((current) =>
      current.field === field
        ? { field, order: current.order === 'asc' ? 'desc' : 'asc' }
        : { field, order: 'asc' },
    )
    setPage(1)
  }

  function openPatient(patient) {
    prefillPatient(patient)
    navigate(`/patients/${patient.patient_id}`)
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1
  const from = data?.total ? (page - 1) * PAGE_SIZE + 1 : 0
  const to = data ? Math.min(page * PAGE_SIZE, data.total) : 0

  const searchBox = (
    <label className="relative w-full sm:w-72">
      <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
        placeholder="Search name or phone"
        aria-label="Search patients"
        className="w-full rounded-lg border border-slate-300 py-2 pr-9 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
      {/* Old results stay visible; this small spinner shows a new search is on its way */}
      {(isFetching || search.trim() !== debouncedSearch) && !isPending && (
        <span className="absolute top-1/2 right-3 -translate-y-1/2">
          <Spinner size="sm" />
        </span>
      )}
    </label>
  )

  return (
    <Card
      title="All patients"
      subtitle={data ? `${data.total} total` : undefined}
      action={searchBox}
    >
      {isError ? (
        <ErrorMessage error={error} onRetry={refetch} />
      ) : isPending ? (
        // Grey placeholder rows while the first page loads
        <div className="space-y-4 py-2" aria-label="Loading patients">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="hidden h-4 w-24 sm:block" />
              <Skeleton className="hidden h-4 w-24 sm:block" />
            </div>
          ))}
        </div>
      ) : data.items.length === 0 ? (
        <EmptyState
          title={debouncedSearch ? 'No matching patients' : 'No patients yet'}
          description={
            debouncedSearch
              ? 'Try a different name or phone number.'
              : 'Use "Add Patient" to register the first one.'
          }
        />
      ) : (
        <>
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  {/* Name column stays pinned while the rest scrolls sideways on phones */}
                  <SortableHeader
                    label="Patient name"
                    field="name"
                    sort={sort}
                    onSort={changeSort}
                    className={PINNED + ' bg-slate-50'}
                  />
                  <SortableHeader
                    label="Patient ID"
                    field="patient_id"
                    sort={sort}
                    onSort={changeSort}
                  />
                  <th className="px-5 py-2 font-medium">Age</th>
                  <th className="px-5 py-2 font-medium">Phone</th>
                  <SortableHeader
                    label="Case sheet"
                    field="status"
                    sort={sort}
                    onSort={changeSort}
                  />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((patient) => (
                  <tr
                    key={patient.patient_id}
                    // Rows open the profile by click, or by Enter for keyboard users
                    tabIndex={0}
                    role="link"
                    aria-label={`Open ${patient.full_name}`}
                    onClick={() => openPatient(patient)}
                    onKeyDown={(e) => e.key === 'Enter' && openPatient(patient)}
                    className="group cursor-pointer outline-none hover:bg-blue-50 focus-visible:bg-blue-50"
                  >
                    <td
                      className={`${PINNED} bg-white px-5 py-3 group-hover:bg-blue-50 group-focus-visible:bg-blue-50`}
                    >
                      <div className="flex items-center gap-3">
                        <PatientAvatar patient={patient} />
                        <span className="font-medium whitespace-nowrap text-slate-900">
                          {patient.full_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{patient.patient_id}</td>
                    <td className="px-5 py-3 text-slate-600">{patient.age} yrs</td>
                    <td className="px-5 py-3 text-slate-600">{patient.phone}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={patient.case_sheet_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
            <span>
              Showing {from}–{to} of {data.total}
            </span>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </>
      )}
    </Card>
  )
}

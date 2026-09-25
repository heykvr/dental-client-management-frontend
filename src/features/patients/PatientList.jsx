import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Pagination from '@/components/ui/Pagination'
import Spinner from '@/components/ui/Spinner'
import PatientAvatar from '@/features/patients/PatientAvatar'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { usePatients, usePrefillPatient } from '@/hooks/usePatients'
import { formatDate } from '@/lib/utils'

const PAGE_SIZE = 10

export default function PatientList() {
  const navigate = useNavigate()
  const prefillPatient = usePrefillPatient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  // Wait 250 ms after the last keystroke before searching (fewer API calls, still feels instant)
  const debouncedSearch = useDebouncedValue(search.trim(), 250)
  const { data, isPending, isError, error, refetch, isFetching } = usePatients({
    search: debouncedSearch,
    page,
    limit: PAGE_SIZE,
  })

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
    <Card title="Patients" action={searchBox}>
      {isError ? (
        <ErrorMessage error={error} onRetry={refetch} />
      ) : isPending ? (
        <div className="py-10 text-center">
          <Spinner label="Loading patients…" />
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
              <thead className="border-b border-slate-100 text-xs text-slate-500 uppercase">
                <tr>
                  <th className="px-5 py-2 font-medium">Patient</th>
                  <th className="px-5 py-2 font-medium">Patient ID</th>
                  <th className="px-5 py-2 font-medium">Age / DOB</th>
                  <th className="px-5 py-2 font-medium">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((patient) => (
                  <tr
                    key={patient.patient_id}
                    onClick={() => {
                      prefillPatient(patient)
                      navigate(`/patients/${patient.patient_id}`)
                    }}
                    className="cursor-pointer hover:bg-blue-50/50"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <PatientAvatar patient={patient} />
                        <span className="font-medium text-slate-900">{patient.full_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{patient.patient_id}</td>
                    <td className="px-5 py-3 text-slate-600">
                      {patient.age} yrs
                      <span className="block text-xs text-slate-400">
                        {formatDate(patient.date_of_birth)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{patient.phone}</td>
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

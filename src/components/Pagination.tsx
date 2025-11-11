interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, hasNextPage, onPageChange }: PaginationProps) => {
  const canGoPrev = currentPage > 1
  const canGoNext = hasNextPage && currentPage < totalPages

  const handlePrev = () => {
    if (canGoPrev) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (canGoNext) onPageChange(currentPage + 1)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900/20">
      <div>
        Page {currentPage} of {totalPages || 1}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canGoNext}
          className="rounded-xl border border-indigo-500 bg-indigo-500 px-4 py-2 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-indigo-400 dark:bg-indigo-500/80 dark:hover:bg-indigo-400"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination

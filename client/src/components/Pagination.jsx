import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PaginationButton from './PaginationButton'

const Pagination = () => {
  const [totalPages, setTotalPages] = useState(5)
  const perPageOptions = [15, 30, 50]
  const [activePerPage, setActivePerPage] = useState(15)
  const [activePageNumber, setActivePageNumber] = useState(1)

  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className='text-sm flex flex-col sm:flex-row justify-between gap-4 mt-8'>
      {/* For number of pages, and current active page */}
      <div className='flex items-center justify-center sm:justify-start gap-2'>
        {Array(totalPages)
          .fill()
          .map((_, i) => (
            <PaginationButton
              key={i}
              active={i + 1 === activePageNumber}
              pageNumber={i + 1}
            />
          ))}
        <button className='rounded-md border border-gray-300 hover:bg-gray-300 px-1 py-1'>
          Next Page
        </button>
      </div>

      {/* for result per page */}
      <div className='flex items-center justify-center sm:justify-start gap-2'>
        {perPageOptions.map((perPage, i) => (
          <PaginationButton
            key={i}
            active={perPage === activePerPage}
            pageNumber={perPage}
          />
        ))}
        <span>results per page</span>
      </div>
    </div>
  )
}

export default Pagination
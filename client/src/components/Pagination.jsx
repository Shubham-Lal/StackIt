import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PaginationButton from './PaginationButton'

export default function Pagination() {
  const [totalPages, setTotalPages] = useState(5)
  const perPageOptions = [15, 30, 50]
  const [activePerPage, setActivePerPage] = useState(15)
  const [activePageNumber, setActivePageNumber] = useState(1)

  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className='text-sm flex justify-between mt-8'>
      {/* For number of pages, and current active page */}
      <div className='flex gap-2'>
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
      <div className='flex items-center gap-2'>
        {perPageOptions.map((perPage, i) => (
          <PaginationButton
            key={i}
            active={perPage === activePerPage}
            pageNumber={perPage}
          />
        ))}
        <span>per page</span>
      </div>
    </div>
  )
}

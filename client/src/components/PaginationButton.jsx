import React from 'react'

export default function PaginationButton ({ active, pageNumber }) {
  console.log('active: ', active)
  console.log('page number: ', pageNumber)
  return (
    <div>
      <button
        className={`px-3 py-1 rounded-md ${
          active
            ? 'text-white bg-amber-600 hover:bg-amber-700'
            : 'hover:bg-gray-200 border border-gray-300'
        }`}
      >
        {pageNumber}
      </button>
    </div>
  )
}

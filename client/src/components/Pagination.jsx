import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Pagination ({ activePage }) {
  const [totalPages, setTotalPages] = useState(100)
  const perPageOptions = [15, 30, 50]
  const [resultPerPage, setResultPerPage] = useState(15)

  const [searchParams, setSearchParams] = useSearchParams()
  console.log('params: ', searchParams)
  return (
    <div>
      {/* For number of pages, and current active page */}
      <div></div>

      {/* for result per page */}
      
    </div>
  )
}

import React from 'react'

export default function Home () {
  return (
    <div className='py-8 px-24'>
      {/* Search params section */}
      <section>
        {/* Ask a new question */}
        <div>
          <button className='rounded-lg p-2 bg-blue-500 text-white'>
            As a Question
          </button>
        </div>
        <div className='flex'>
          <label className='block text-gray-100 h-4 w-4' htmlFor='search-bar'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
              <g
                id='SVGRepo_tracerCarrier'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></g>
              <g id='SVGRepo_iconCarrier'>
                {' '}
                <path
                  className='stroke-gray-300'
                  d='M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>{' '}
              </g>
            </svg>
          </label>
          <input id='search-bar' type='text' placeholder='Search' />
        </div>
      </section>
    </div>
  )
}

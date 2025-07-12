import React from 'react'

export default function Post ({ post }) {
  return (
    <div className='flex gap-4 p-4 border-b border-gray-300'>
      {/* Left part of post */}
      <div className='text-right whitespace-nowrap'>
        <p>{post.votes} views</p>
        <p>{post.answers} answers</p>
        <p>{post.views} views</p>
      </div>
      {/* The right portion the post */}
      <div>
        <div>
          <h1 className='text-blue-200'>{post.title}</h1>
          <p>{post.description}</p>
        </div>

        {/* The tags and user details */}
        <div className='flex justify-between mt-4'>
          <div className='flex gap-1'>
            {post.tags.map((tag, index) => (
              <p className='px-2 rounded-lg bg-gray-300' key={index}>
                tag
              </p>
            ))}
          </div>
          <div className='flex items-center gap-2'>
            {/* user svg */}
            <div className='flex gap-1 items-center'>
              <div className='h-5 w-5'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <circle
                      opacity='0.5'
                      cx='12'
                      cy='9'
                      r='3'
                      stroke='#1C274C'
                      stroke-width='1.5'
                    ></circle>{' '}
                    <circle
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='#1C274C'
                      stroke-width='1.5'
                    ></circle>{' '}
                    <path
                      opacity='0.5'
                      d='M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20'
                      stroke='#1C274C'
                      stroke-width='1.5'
                      stroke-linecap='round'
                    ></path>{' '}
                  </g>
                </svg>
              </div>
              <p>{post.username}</p>
            </div>

            <p>{post.asks}</p>
            <p>{post.timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

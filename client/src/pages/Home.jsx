import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Post from '../components/Post'

export default function Home () {
  const [filters, setFilters] = useState(['Newest', 'Most voted'])
  const [activeFilter, setActiveFilter] = useState(filters[0])

  const posts = [
    {
      id: 1,
      title: 'How to center a div',
      description:
        'I have been struggling to center a div without using css and javascript. This was a real challenge when css was not invented. I wonder how much of time it would have taken by folks those days.',
      views: 20,
      votes: 5,
      answers: 5,
      tags: ['CSS', 'HTML', 'Web'],
      username: 'Jay9874',
      totalAsks: 30,
      timestamp: '5 min ago'
    },
    {
      id: 2,
      title: 'How to center a div',
      description:
        'I have been struggling to center a div without using css and javascript. This was a real challenge when css was not invented. I wonder how much of time it would have taken by folks those days.',
      views: 20,
      votes: 5,
      answers: 5,
      tags: ['CSS', 'HTML', 'Web'],
      username: 'Jay9874',
      totalAsks: 30,
      timestamp: '5 min ago'
    },
    {
      id: 3,
      title: 'How to center a div',
      description:
        'I have been struggling to center a div without using css and javascript. This was a real challenge when css was not invented. I wonder how much of time it would have taken by folks those days.',
      views: 20,
      votes: 5,
      answers: 5,
      tags: ['CSS', 'HTML', 'Web'],
      username: 'Jay9874',
      totalAsks: 30,
      timestamp: '5 min ago'
    },
    {
      id: 4,
      title: 'How to center a div',
      description:
        'I have been struggling to center a div without using css and javascript. This was a real challenge when css was not invented. I wonder how much of time it would have taken by folks those days.',
      views: 20,
      votes: 5,
      answers: 5,
      tags: ['CSS', 'HTML', 'Web'],
      username: 'Jay9874',
      totalAsks: 30,
      timestamp: '5 min ago'
    },
    {
      id: 5,
      title: 'How to center a div',
      description:
        'I have been struggling to center a div without using css and javascript. This was a real challenge when css was not invented. I wonder how much of time it would have taken by folks those days.',
      views: 20,
      votes: 5,
      answers: 5,
      tags: ['CSS', 'HTML', 'Web'],
      username: 'Jay9874',
      totalAsks: 30,
      timestamp: '5 min ago'
    },
    {
      id: 6,
      title: 'How to center a div',
      description:
        'I have been struggling to center a div without using css and javascript. This was a real challenge when css was not invented. I wonder how much of time it would have taken by folks those days.',
      views: 20,
      votes: 5,
      answers: 5,
      tags: ['CSS', 'HTML', 'Web'],
      username: 'Jay9874',
      totalAsks: 30,
      timestamp: '5 min ago'
    }
  ]
  return (
    <div className='py-8 px-24'>
      {/* Search params section */}
      <section>
        {/* Ask a new question */}
        <div className='flex items-center justify-between'>
          <di>{activeFilter} Questions</di>
          <NavLink to='/ask' className='rounded-lg p-2 bg-blue-500 text-white'>
            As a Question
          </NavLink>
        </div>
        <div className='flex mt-4 items-center gap-1 focus-within:border-amber-500 rounded-lg p-2 border-1 border-gray-300'>
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
                  className='stroke-[#808080]'
                  d='M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>{' '}
              </g>
            </svg>
          </label>
          <input
            className='border-none focus:border-none focus:outline-none'
            id='search-bar'
            type='text'
            placeholder='Search...'
          />
        </div>
        {/* Show the questions based on filter */}
        <div>
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

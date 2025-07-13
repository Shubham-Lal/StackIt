import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuestionStore } from '../store/questionStore'
import Post from '../components/Post'
import FilterButton from '../components/FilterButton'
import Pagination from '../components/Pagination'

export default function Home() {
  const { questions, setQuestions } = useQuestionStore()

  const [filters, setFilters] = useState(['Newest', 'Most voted'])
  const [activeFilter, setActiveFilter] = useState(filters[0])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/questions/all`)
        const data = await res.json()
        if (res.ok) {
          setQuestions(data.questions)
        }
        else {
          console.error(data.message || 'Failed to fetch questions')
        }
      }
      catch {
        console.error('Error fetching questions')
      }
    }

    if (!questions.length) fetchQuestions()
  }, [questions.length, setQuestions])

  return (
    <div className='py-8 px-24'>
      <section>
        {/* Ask a new question */}
        <div className='flex items-center justify-between'>
          <h1 className='text-xl'>{activeFilter} Questions</h1>
          <NavLink to='/ask' className='rounded-lg p-2 bg-blue-500 text-white'>
            Ask a Question
          </NavLink>
        </div>
        {/* Filters */}
        <div className='w-full flex items-center justify-end gap-4 mt-4'>
          <div className='flex p-1 items-center border gap-1 border-gray-300 rounded-lg'>
            {/* <p className='px-2 py-1 rounded-md bg-gray-200'>Newest</p>
            <p className='px-2 py-1 rounded-md bg-gray-200'>Active</p>
            <p className='px-2 py-1 rounded-md bg-gray-200'>Unanswered</p>
            <p className='px-2 py-1 rounded-md bg-gray-200'>More</p> */}
            {filters.map((filter, index) => (
              <FilterButton key={index} active={activeFilter} label={filter} />
            ))}
          </div>
          {/* filter button */}
          <div className=''>
            <button className='flex items-center gap-2 py-1 px-2 rounded-lg bg-blue-50 hover:bg-blue-200 border text-blue-500 font-light'>
              <div className='h-2 w-5 flex items-center'>
                <svg
                  className='fill-blue-400'
                  viewBox='0 0 32 32'
                  version='1.1'
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
                    <title>bars-filter</title>{' '}
                    <path d='M30 7.249h-28c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h28c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM24 15.25h-16c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h16c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM19 23.25h-6.053c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h6.053c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z'></path>{' '}
                  </g>
                </svg>
              </div>
              <p className='p-0 m-0'>Filter</p>
            </button>
          </div>
        </div>

        {/* Searchbar */}
        <div className='flex mt-4 mb-8 items-center gap-1 focus-within:border-amber-500 rounded-lg p-2 border-1 border-gray-300'>
          <label className='block text-gray-100 h-4 w-4' htmlFor='search-bar'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                className='stroke-[#808080]'
                d='M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </label>
          <input
            className='w-full border-none focus:border-none focus:outline-none'
            id='search-bar'
            type='text'
            placeholder='Search...'
          />
        </div>

        <div className='bg-gray-300 w-full h-[1px]' />

        {/* Show the questions */}
        {questions.length > 0 ? (
          questions.map(question => <Post key={question._id} post={question} />)
        ) : (
          <p className='py-8 border-b border-gray-300'>No questions posted yet</p>
        )}

        <Pagination />
      </section>
    </div>
  )
}

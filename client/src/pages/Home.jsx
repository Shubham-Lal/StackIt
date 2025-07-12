import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuestionStore } from '../store/questionStore'
import Post from '../components/Post'

export default function Home() {
  const { questions, setQuestions } = useQuestionStore();

  const [filters, setFilters] = useState(['Newest', 'Most voted'])
  const [activeFilter, setActiveFilter] = useState(filters[0])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/questions/all')
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

    if (!questions.length) fetchQuestions();
  }, [questions.length])

  return (
    <div className='py-8 px-24'>
      <section>
        {/* Ask a new question */}
        <div className='flex items-center justify-between'>
          <div>{activeFilter} Questions</div>
          <NavLink to='/ask' className='rounded-lg p-2 bg-blue-500 text-white'>
            Ask a Question
          </NavLink>
        </div>
        {/* Filters */}
        <div className='w-full flex justify-end'>
          <div></div>
          {/* filter button */}
          <div>
            <button>Filter</button>
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
          questions.map((question) => (
            <Post key={question._id} post={question} />
          ))
        ) : (
          <p>No questions posted yet</p>
        )}
      </section>
    </div>
  )
}
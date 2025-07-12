import React from 'react'

export default function Navbar () {
  return (
    <div className='sticky top-0'>
      <div className='flex justify-between p-4'>
        <div className='flex gap-2 items-center'>
          <div>
            <img height={50} width={50} src='/logo.svg' alt='company logo' />
          </div>
          <ul>
            <li>
              <a>About</a>
              <a>Team</a>
              <a>Contact</a>
            </li>
          </ul>
        </div>

        {/* Login/ Sign up */}
        <div className='flex items-center gap-1'>
          <button className='py-1 px-2 rounded-lg bg-blue-50 hover:bg-blue-200 border text-blue-500 font-light'>
            Login
          </button>
          <button className='py-1 px-2 rounded-lg bg-blue-700 hover:bg-blue-900 border text-white/85 font-light'>
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

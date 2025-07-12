import React from 'react'

export default function Navbar () {
  return (
    <div className='sticky top-0 p-4 m-4'>
      {/* div for company logo */}
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
      <div>
        <button>Login</button>
        <button>Sign up</button>
      </div>
    </div>
  )
}

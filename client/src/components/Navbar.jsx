import React from 'react'
import NavlinkButton from './NavlinkButton'

export default function Navbar () {
  return (
    <div className='sticky top-0 border-b-1 border-gray-300'>
      <div className='flex justify-between py-2 px-24'>
        <div className='flex gap-8 items-center'>
          <div className='flex gap-2 items-center'>
            <img height={35} width={35} src='/logo.svg' alt='company logo' />
            <span>
              <span className='text-black/90 font-light'>Stack</span>
              <span className='text-black font-bold'>It</span>
            </span>
          </div>
          <ul className='flex gap-2 text-gray-600'>
            <NavlinkButton buttonLabel='About' buttonHref='/about' />
            <NavlinkButton buttonLabel='Team' buttonHref='/team' />
            <NavlinkButton buttonLabel='Contact' buttonHref='/contact' />
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

import { Link } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { NavLink } from 'react-router-dom'
import NavlinkButton from './NavlinkButton'

export default function Navbar() {
  const { isAuthenticated, user } = useUserStore()

  return (
    <div className='sticky top-0 border-b-1 border-gray-300 bg-white'>
      <div className='flex justify-between items-center py-2 px-24'>
        <div className='flex gap-8 items-center'>
          <NavLink to=''>
            <div className='flex gap-2 items-center rounded-sm px-2 py-1 cursor-pointer hover:bg-gray-200'>
              <img height={35} width={35} src='/logo.svg' alt='company logo' />
              <span>
                <span className='text-black/90 font-light'>Stack</span>
                <span className='text-black font-bold'>It</span>
              </span>
            </div>
          </NavLink>

          <ul className='flex gap-2 text-gray-600'>
            <NavlinkButton buttonLabel='About' buttonHref='/about' />
            <NavlinkButton buttonLabel='Team' buttonHref='/team' />
            <NavlinkButton buttonLabel='Contact' buttonHref='/contact' />
          </ul>
        </div>

        {isAuthenticated ? (
          <div className='size-[34px] rounded-full bg-blue-50 hover:bg-blue-200 border border-blue-500 overflow-hidden'>
            <img
              src={user.avatar || '/user.png'}
              alt=''
              className='size-full object-cover'
            />
          </div>
        ) : (
          <div className='flex items-center gap-1'>
            <Link
              to='/login'
              className='py-1 px-2 rounded-lg bg-blue-50 hover:bg-blue-200 border text-blue-500 font-light'
            >
              Login
            </Link>
            <Link
              to='/signup'
              className='py-1 px-2 rounded-lg bg-blue-700 hover:bg-blue-900 border text-white/85 font-light'
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

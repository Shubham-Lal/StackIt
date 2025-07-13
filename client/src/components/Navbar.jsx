import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { NavLink } from 'react-router-dom'
import NavlinkButton from './NavlinkButton'

const Navbar = () => {
  const { isAuthenticated, user, clearUser } = useUserStore();

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUser();
  }

  return (
    <div className='sticky top-0 border-b-1 border-gray-300 bg-white'>
      <div className='relative max-w-6xl w-full mx-auto p-2 flex justify-between items-center'>
        <div className='flex gap-8 items-center'>
          <NavLink to=''>
            <div className='flex gap-2 items-center rounded-sm py-1 cursor-pointer hover:bg-gray-200'>
              <img height={35} width={35} src='/logo.svg' alt='company logo' />
              <span>
                <span className='text-black/90 font-light'>Stack</span>
                <span className='text-black font-bold'>It</span>
              </span>
            </div>
          </NavLink>

          <ul className='hidden sm:flex gap-2 text-gray-600'>
            <NavlinkButton buttonLabel='About' buttonHref='/about' />
            <NavlinkButton buttonLabel='Team' buttonHref='/team' />
            <NavlinkButton buttonLabel='Contact' buttonHref='/contact' />
          </ul>
        </div>

        <div className='flex items-center gap-2'>
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

          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            className={`${isAuthenticated ? 'cursor-pointer' : 'sm:hidden'} cursor-pointer`}
          >
            <svg aria-hidden='true' className='fill-gray-600' width='18' height='18' viewBox='0 0 18 18'><path d='M15 1H3a2 2 0 0 0-2 2v2h16V3a2 2 0 0 0-2-2M1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 0 0 2-2v-2H1zm16-7H1v4h16z'></path></svg>
          </button>
        </div>

        {openSidebar && (
          <div className='absolute top-[59px] right-0 py-2 px-4 flex flex-col gap-2 border border-gray-300 bg-white'>
            <div className='flex sm:hidden flex-col gap-2'>
              <NavlinkButton buttonLabel='About' buttonHref='/about' />
              <NavlinkButton buttonLabel='Team' buttonHref='/team' />
              <NavlinkButton buttonLabel='Contact' buttonHref='/contact' />
            </div>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className='hover:bg-gray-200 rounded-3xl  py-1 px-4 cursor-pointer'
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavlinkButton ({ buttonLabel, buttonHref }) {
  return (
    <li className='rounded-3xl hover:bg-gray-200 py-1 px-4 cursor-pointer'>
      <NavLink
        to={buttonHref}
        className={({ isActive }) =>
          [
            isActive
              ? 'text-white/85 bg-amber-500 hover:bg-amber-600'
              : 'hover:bg-gray-200',
            'rounded-3xl  py-1 px-4 cursor-pointer'
          ].join(' ')
        }
      >
        {buttonLabel}
      </NavLink>
    </li>
  )
}

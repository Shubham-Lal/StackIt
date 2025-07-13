import { NavLink } from 'react-router-dom'

const NavlinkButton = ({ buttonLabel, buttonHref }) => {
  return (
    <NavLink
      to={buttonHref}
      className={({ isActive }) =>
        [
          isActive
            ? 'text-white bg-amber-600 hover:bg-amber-700'
            : 'hover:bg-gray-200',
          'rounded-3xl  py-1 px-4 cursor-pointer'
        ].join(' ')
      }
    >
      {buttonLabel}
    </NavLink>
  )
}

export default NavlinkButton
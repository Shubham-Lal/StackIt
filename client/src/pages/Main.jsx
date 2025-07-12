import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Main () {
  return (
    <div>
      <Navbar />
      <div className='px-26'>
        <Outlet />
      </div>
    </div>
  )
}

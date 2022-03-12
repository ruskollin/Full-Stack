import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

const Menu = () => {
  return (
    <div className='nav-bar'>
      <Link to="/" className='button-4'>
        anecdotes
      </Link>
      <Link to="/create" className='button-4'>
        create new
      </Link>
      <Link to="/about" className='button-4'>
        about
      </Link>
    </div>
  )
}

export default Menu
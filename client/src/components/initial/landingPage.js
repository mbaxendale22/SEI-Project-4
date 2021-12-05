import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='bg-primary bg-opacity-90 flex flex-col justify-evenly items-center h-screen' >
      <div className='text-6xl text-white'>Household</div>
      <div className='flex w-3/4 justify-around'>
        <Link to='/login' className='pr-btn'>Login</Link>
        <Link to='/register'className='pr-btn'>Sign up</Link>
      </div>
      <div className='text-white mx-6 text-lg text-center'>Handle your household finances with the push of a button</div>
    </div>
  )
}

export default LandingPage



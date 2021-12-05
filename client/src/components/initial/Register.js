import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// this is where you'll set the userContext from the data returned by the post request, this 
// will make the user data available for api calls acorss the app


const Register = () => {

const [register, setRegister] = useState({
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})

const [error, setError] = useState(false)

const setItemToLocalStorage = token => window.localStorage.setItem('token', token)


const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const { data } = await axios.post('/api/login', register)
    setItemToLocalStorage(data.token)
  } catch (err) {
    setError(true)
  }
  const inputs = [ ...document.querySelectorAll('input') ]
}


const handleChange = (e) => {
  const newRegister = { ...register, [e.target.name]: e.target.value }
  setRegister(newRegister)
}







  return (
    <div className='bg-primary bg-opacity-90 h-screen flex flex-col justify-center items-center'>
      <form className= ' shadow-md h-4/6 w-7/12 flex items-center justify-evenly flex-col'>
        <div className= 'w-3/4 flex flex-col'>
          <label for='username' className=''>Username</label>
          <input 
          type='text' name='username' placeholder='username...' 
          className='rounded-md mt-3 p-1'></input>
        </div>
        <div className='w-3/4 flex flex-col'>
          <label for='email' className=''>Email</label>
          <input
          type='email' name='email' placeholder='email...' 
          className=' rounded-md mt-3 p-1'></input>
        </div>
        <div className='w-3/4 flex flex-col'>
          <label for='password' className=''>Password</label>
          <input
          type='password' name='password' placeholder='password...' 
          className='rounded-md mt-3 p-1'></input>
        </div>
        <div className='w-3/4 flex flex-col'>
          <label for='passwordConfirmation'
          className=''>Confirm Password</label>
          <input 
          type='password' name='passwordConfirmation' placeholder='confirm password...' 
          className='rounded-md mt-3 p-1'></input>
        </div>
        <div className='pr-btn bg-opacity-95 w-3/4 '>Sign Up</div>
      </form>
      <div className='mt-8 w-full flex flex-col items-center'>
      <p className='text-white'>Already Signed up?</p>
      <Link to='/login' className='pr-btn bg-opacity-95 w-1/4 mt-4'>Sign In</Link>
      </div>
    </div>
  )
}

export default Register

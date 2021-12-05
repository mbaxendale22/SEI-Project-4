import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {


const [login, setLogin] = useState({
  username: '',
  password: ''
})

const [error, setError] = useState(false)

const setItemToLocalStorage = token => window.localStorage.setItem('token', token)


const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const { data } = await axios.post('/api/login', login)
    setItemToLocalStorage(data.token)
  } catch (err) {
    setError(true)
  }
  const inputs = [ ...document.querySelectorAll('input') ]
}


const handleChange = (e) => {
  const newLogin = { ...login, [e.target.name]: e.target.value }
  console.log(newLogin)
  setLogin(newLogin)
}

  return (
    <div className='bg-primary bg-opacity-90 h-screen'>
      
    </div>
  )
}

export default Login

'use client'

import { createUser } from '@/app/api/user/create'
import { useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { setUser } from '@/redux/features/user/userSlice'
import { redirect } from 'next/navigation'
import generateRandomBackgroundAndColor from '@/utils/randomColor'
import User from '@/models/User'

export default function RegisterForm() {
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setError('')
    setName(e.target.value)
  }

  async function handleSubmit() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    setLoading(true)

    if(!name) {
      setLoading(false)
      return setError('Please enter a name.')
    }

    if(!password) {
      setLoading(false)
      return setError('Please enter a password.')
    }

    if(!passwordRegex.test(password)) {
      setLoading(false)
      return setError('Password must have 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.')
    }

    if(password !== confirmPassword) {
      setLoading(false)
      return setError('Passwords do not match.')
    }

    const id = Math.floor(Math.random() * 100000)
    const { backgroundColor, textColor } = generateRandomBackgroundAndColor()

    const data: {
      name: string,
      password: string,
      id: number,
      backgroundColor: string,
      textColor: string,
    } = {
      name,
      password,
      id,
      backgroundColor,
      textColor,
    }

    const result = await createUser(data)

    if (result?.error) {
      setLoading(false)
      return setError(result.error)
    }

    if(result?.success) {
      dispatch(setUser(result.user))
      localStorage.setItem('user', JSON.stringify(result.user))
      redirect('/')
    } else {
      return setError('Oops! Something went wrong. Please try again.')
    }
  }

  return (
    <form className="flex flex-col rounded-md w-full max-w-md bg-white p-5" action={handleSubmit} method="POST">
      <input 
        type="text" 
        name="name" 
        placeholder="name" 
        className={
          `border border-gray-300 rounded-md p-2 mb-5 mt-5 
          ${error ? 'border-red-500 input-error-anim' : ''}`
        }
        onChange={(e) => handleChangeName(e)} 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="password" 
        className="border border-gray-300 rounded-md p-2 mb-5" 
        onChange={(e) => setPassword(e.target.value)}
      />
      <input 
        type="password" 
        name="confirmPassword" 
        placeholder="confirm password" 
        className="border border-gray-300 rounded-md p-2 mb-5" 
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit" className="bg-indigo-500 text-white rounded-md p-2" disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
      <small className="text-red-500 h-4">{error}</small>
    </form>
  )
}
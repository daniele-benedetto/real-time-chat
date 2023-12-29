'use client'

import { loginUser } from '@/app/api/user/login'
import { useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { setUser } from '@/redux/features/user/userSlice'
import { redirect } from 'next/navigation'

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setError('')
    setName(e.target.value)
  }

  async function handleSubmit() {
    setLoading(true)

    if(!name) {
      setLoading(false)
      return setError('Please enter a name.')
    }

    if(!password) {
      setLoading(false)
      return setError('Please enter a password.')
    }

    const data: {
      name: string,
      password: string,
    } = {
      name,
      password,
    }

    const result = await loginUser(data)

    if (result?.error) {
      setLoading(false)
      return setError(result.error)
    }
    

    if(result?.success) {

      dispatch(setUser({
        name: result.user.name,
        backgroundColor: result.user.backgroundColor,
        textColor: result.user.textColor,
        id: Number(result.user.id),
        token: result.user.token,
      }))

      localStorage.setItem('user', JSON.stringify({
        name: result.user.name,
        backgroundColor: result.user.backgroundColor,
        textColor: result.user.textColor,
        id: result.user.id,
        token: result.user.token,
      }))

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
          ${error && !name ? 'border-red-500 input-error-anim' : ''}`
        }
        onChange={(e) => handleChangeName(e)} 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="password" 
        className={
          `border border-gray-300 rounded-md p-2 mb-5 
          ${error && !password ? 'border-red-500 input-error-anim' : ''}`
        }
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-indigo-500 text-white rounded-md p-2" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
      <small className="text-red-500 h-4 text-center w-full">{error}</small>
    </form>
  )
}
'use client'

import { createUser } from '@/app/api/user/create'
import { useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { setUser } from '@/redux/features/user/userSlice'
import { redirect } from 'next/navigation'

export default function RegisterForm() {
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setError('')
    setName(e.target.value)
  }

  async function handleSubmit(formData: Iterable<readonly [PropertyKey, any]>) {
    setLoading(true)

    if(!name) {
      setLoading(false)
      return setError('Please enter a name.')
    }

    const result = await createUser(formData)

    if (result?.error) {
      setLoading(false)
      return setError(result.error)
    }

    if(result?.success) {
      const { user } = result
      if(user) {
        dispatch(setUser(user))
        localStorage.setItem('user', JSON.stringify(user))
        redirect('/')
      }
    } else {
      return setError('Oops! Something went wrong. Please try again.')
    }
  }

  return (
    <form className="flex flex-col rounded-md w-full max-w-md bg-white p-5" action={handleSubmit} method="POST">
      <input type="text" name="name" placeholder="name" className={`border border-gray-300 rounded-md p-2 mb-5 mt-5 ${error ? 'border-red-500 input-error-anim' : ''}`} onChange={(e) => handleChangeName(e)} />
      <button type="submit" className="bg-indigo-500 text-white rounded-md p-2" disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
      <small className="text-red-500 h-4">{error}</small>
    </form>
  )
}
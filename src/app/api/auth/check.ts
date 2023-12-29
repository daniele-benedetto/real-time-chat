'use server'

import jwt from 'jsonwebtoken'
import { client } from '@/lib/redis'

const checkUser = async (token:string) => {

  if (!token) {
    return {
      error: 'Not authorized'
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    const id = decoded.id
    const expired = decoded.exp < Date.now() / 1000

    if (expired) {
      return {
        error: 'Not authorized '
      }
    }

    const storedToken = await client.hGet(`tokens:${id}`, 'token')

    if (storedToken !== token) {
      return {
        error: 'Not authorized'
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    return {
      error: 'Not authorized'
    }
  }
}

export default checkUser

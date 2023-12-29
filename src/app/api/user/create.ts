'use server'

import { client } from "@/lib/redis"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const connectToRedis = async () => {
  if (!client.isOpen) {
    await client.connect()
  }
}

export async function createUser(data: {
  name: string,
  id: number,
  password: string,
  backgroundColor: string,
  textColor: string
}) {
  await connectToRedis()
  
  const { 
    name,
    id,
    password,
    backgroundColor,
    textColor
  } = data

  const unique = await client.zAdd('users', {
    value: name,
    score: id
  }, { NX: true })

  if (!unique) {
    return { error: 'User already exists' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await client.hSet(`users:${id}`, {
    name,
    id,
    backgroundColor,
    textColor,
    password: hashedPassword,
  })

  const token = jwt.sign(
    {
      name,
      id,
    },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '24h' }
  )

  await client.zAdd('tokens', {
    value: token,
    score: id
  })

  await client.hSet(`tokens:${id}`, {
    token
  })

  return {
    success: true,
    user: {
      name,
      id,
      backgroundColor,
      textColor,
      token
    },
  }
}
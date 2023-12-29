'use server'

import { client } from "@/lib/redis"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const connectToRedis = async () => {
  if (!client.isOpen) {
    await client.connect()
  }
}

export async function loginUser(data: {
  name: string,
  password: string
}) {
  await connectToRedis()

  const {
    name,
    password
  } = data

  const id = await client.zScore('users', name)

  if (!id) {
    return { error: 'Name or password is incorrect' }
  }

  const user = await client.hGetAll(`users:${id}`)

  if (!user) {
    return { error: 'Name or password is incorrect' }
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    return { error: 'Name or password is incorrect' }
  }

  const token = jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '24h' }
  )

  await client.zAdd('tokens', {
    value: token,
    score: user.id
  })

  await client.hSet(`tokens:${user.id}`, {
    token: token
  })

  return {
    success: true,
    user: {
      name: user.name,
      id: user.id,
      backgroundColor: user.backgroundColor,
      textColor: user.textColor,
      token: token
    }
  }
}

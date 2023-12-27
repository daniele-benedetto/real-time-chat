'use server'

import { client } from "@/lib/redis"

export async function createUser(formData: Iterable<readonly [PropertyKey, any]>) {
  const { name } = Object.fromEntries(formData)

  const id = Math.floor(Math.random() * 100000)

  const unique = await client.zAdd('users', {
    value: name,
    score: id
  }, { NX: true })

  if (!unique) {
    return {error: 'User already exists'}
  }
  
  await client.hSet(`users:${id}`, {
    name,
    id
  })

  return {
    success: true,
    user: {
      name,
      id
    }
  }
}
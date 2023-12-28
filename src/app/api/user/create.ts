'use server'

import { client } from "@/lib/redis"
import generateRandomBackgroundAndColor from "@/utils/randomColor"

const connectToRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

export async function createUser(formData: Iterable<readonly [PropertyKey, any]>) {
  await connectToRedis();
  
  const { name } = Object.fromEntries(formData)

  const id = Math.floor(Math.random() * 100000)
  const { backgroundColor, textColor } = generateRandomBackgroundAndColor()

  const unique = await client.zAdd('users', {
    value: name,
    score: id
  }, { NX: true })

  if (!unique) {
    return {error: 'User already exists'}
  }
  
  await client.hSet(`users:${id}`, {
    name,
    id,
    backgroundColor,
    textColor
  })

  return {
    success: true,
    user: {
      name,
      id,
      backgroundColor,
      textColor
    }
  }
}
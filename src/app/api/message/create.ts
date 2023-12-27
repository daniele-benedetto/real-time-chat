'use server'

import { client } from "@/lib/redis"
import formattedDate from "@/utils/formatDate"
import { redirect } from 'next/navigation'

export async function createMessage(formData: Iterable<readonly [PropertyKey, any]>) {
  const { content, user_id } = Object.fromEntries(formData)

  const id = Math.floor(Math.random() * 100000)
  const time = formattedDate(new Date())
  const unique = await client.zAdd('messages', {
    value: content,
    score: id
  }, { NX: true })

  if (!unique) {
    return {error: 'Message already exists'}
  }
  
  await client.hSet(`messages:${id}`, {
    content,
    user_id,
    id,
    time
  })

  redirect('/')
}
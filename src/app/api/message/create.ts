'use server'

import { client } from "@/lib/redis"

const connectToRedis = async () => {
  if (!client.isOpen) {
    await client.connect()
  }
}

export async function createMessage(data: Iterable<readonly [PropertyKey, any]>) {
  await connectToRedis()

  const { 
    content, 
    user_id, 
    id, 
    time 
  } = Object.fromEntries(data)

  await client.zAdd('messages', {
    value: id.toString(),
    score: id
  }, { NX: true })
  
  await client.hSet(`messages:${id}`, {
    content,
    user_id,
    id,
    time
  })

  const message = JSON.stringify({
    content,
    user_id,
    id,
    time
  })
    
  client.publish("chat-messages", message)
  
  return {
    success: true,
    message: {
      content,
      user_id,
      id,
      time
    }
  }
}
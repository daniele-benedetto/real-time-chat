'use server'

import { client } from "@/lib/redis"
import formattedDate from "@/utils/formatDate"

const connectToRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

export async function createMessage(formData: Iterable<readonly [PropertyKey, any]>) {
  await connectToRedis();

  const { content, user_id } = Object.fromEntries(formData)

  const id = Math.floor(Math.random() * 100000)
  const time = formattedDate(new Date())

  await client.zAdd('messages', {
    value: content,
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
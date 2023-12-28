'use server'

import { createClient } from 'redis'
import getUser from '../user/getById'

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379')
  }
})

client.on('error', err => console.log(err))

const connectToRedis = async () => {
  if (!client.isOpen) {
    await client.connect()
  }
}

const getMessages = async () => {
  await connectToRedis()

  const result = await client.zRangeWithScores('messages', 0, -1)

  const messages = await Promise.all(result.map(async b => {
    const message = await client.hGetAll(`messages:${b.score}`)
    const username = await getUser(message.user_id)
    return Object.assign({}, message, { name: username.name })
  }))

  messages.sort((a, b) => {
    return a.time < b.time ? -1 : 1
  })

  return messages
}

export default getMessages

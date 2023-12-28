'use server'

import { client } from "@/lib/redis"

const connectToRedis = async () => {
    if (!client.isOpen) {
      await client.connect();
    }
  }

const getUsers = async () => {
    await connectToRedis()
    
    const result = await client.zRangeWithScores('users', 0, -1)
  
    const users = await Promise.all(result.map(async b => {
      const user = await client.hGetAll(`users:${b.score}`)
      return Object.assign({}, user)
    }))
    
    return users;
  }
  
  export default getUsers
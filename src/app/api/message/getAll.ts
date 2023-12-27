'use server'

import { client } from "@/lib/redis";
import getUser from "../user/getById";

const getMessages = async () => {
    const result = await client.zRangeWithScores('messages', 0, -1)
  
    const messages = await Promise.all(result.map(async b => {
      const message = await client.hGetAll(`messages:${b.score}`)
      const username = await getUser(message.user_id);
      return Object.assign({}, message, { name: username.name })
    }))
    
    return messages;
  }
  
  export default getMessages
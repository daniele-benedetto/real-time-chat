'use server'

import { client } from "@/lib/redis";

const getUser = async (id: string) => {
  const user = await client.hGetAll(`users:${id}`)
  return Object.assign({}, user)
}

export default getUser
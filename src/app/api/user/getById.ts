'use server'

import { client } from "@/lib/redis";

const connectToRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

const getUser = async (id: string) => {
  await connectToRedis();

  const user = await client.hGetAll(`users:${id}`);
  return Object.assign({}, user);
};

export default getUser;

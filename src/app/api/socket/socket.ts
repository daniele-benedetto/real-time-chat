'use server'

import { attachSocketToServer } from "@/lib/redis"
import { createClient } from "redis";
import { io } from "socket.io-client";

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379')
  }
});

client.on('error', err => console.log(err));

const connectToRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

const attachSocket = async () => {
  await connectToRedis();
  attachSocketToServer(client)

  const socket = io(client)

  console.log('ciao')

  socket.on('chat-messages', (nuovoMessaggio) => {
    console.log('nuovo messaggio')
    console.log(nuovoMessaggio)
  });

  return socket
}

export default attachSocket
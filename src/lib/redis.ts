import { createClient } from 'redis'
import { Server } from 'socket.io'

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379')
  }
})

const io = new Server()

io.on('connection', (socket) => {
  client.subscribe('chat-messages', (channel, message) => {
    io.emit('chat-messages', message);
  });

  socket.on('disconnect', () => {
    client.unsubscribe('chat-messages');
  });
});

const attachSocketToServer = () => {
  const server = require('http').createServer()
  io.attach(server)
}

export { client, attachSocketToServer }

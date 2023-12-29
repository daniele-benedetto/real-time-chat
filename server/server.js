const http = require('http')
const { Server } = require('socket.io')

const server = http.createServer((req, res) => {
  res.end('Hello World')
})

const io = new Server(server)
const usersOnline = []

io.on('connection', (socket) => {

  socket.on('chat message', (message) => {
    io.emit('chat message', message)
  })

  socket.on('connected', (user) => {
    const userAlreadyConnected = usersOnline.find(u => u.id === user.id)
    if (!userAlreadyConnected) {
      user.socketId = socket.id
      usersOnline.push(user)
    }
    io.emit('connected', usersOnline)
  })

  socket.on('disconnected', () => {
    console.log('disconnected', usersOnline)
    const user = usersOnline.find(u => u.socketId == socket.id)
    console.log('disconnected', user, socket.id)
    if (user) {
      usersOnline.splice(usersOnline.indexOf(user), 1)
      io.emit('disconnected', usersOnline)
    }
  })

})

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001')
})

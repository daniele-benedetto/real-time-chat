import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const httpServer = new Server();
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
  },
});

httpServer.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});

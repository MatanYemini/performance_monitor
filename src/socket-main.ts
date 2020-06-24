import socketio from 'socket.io';

type SocketServer = socketio.Server;
type Socket = socketio.Socket;

export default function socketMain(io: SocketServer, socket: Socket | null) {
  console.log('Someone called me im socket main');
}

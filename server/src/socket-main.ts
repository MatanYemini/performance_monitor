import socketio from 'socket.io';
import mongoose from 'mongoose';
import { Client, IMongoConfig } from './utils/general/AppSettings';
import Machine from './models/Machine';
const m_config = require('../configs/mongo-settings.json');
type SocketServer = socketio.Server;
type Socket = socketio.Socket;

try {
  const mongo_config = m_config as IMongoConfig;
  mongoose.connect(mongo_config.mongoUri, { useNewUrlParser: true });
} catch (error) {
  console.log(error);
}

export default function socketMain(io: SocketServer, socket: Socket) {
  socket.on('clientAuth', (type: Client) => {
    if (type.type_str === 'node_client') {
      // Node client has joined
      socket.join('clients');
    } else if (type.type_str === 'react_client') {
      // React client has joined
    } else {
      // Invalid client has joined -> goodbye!
      socket.disconnect(true);
    }
  });
  socket?.on('prefData', (data) => {
    console.log(data);
  });
}

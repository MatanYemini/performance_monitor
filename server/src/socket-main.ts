import socketio from 'socket.io';
import mongoose from 'mongoose';
import { Client, IMongoConfig } from './utils/general/AppSettings';
import { Machine } from './models/Machine';
const m_config = require('../configs/mongo-settings.json');
type SocketServer = socketio.Server;
type Socket = socketio.Socket;

try {
  const mongo_config = m_config as IMongoConfig;
  mongoose.connect(mongo_config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

export default function socketMain(io: SocketServer, socket: Socket) {
  let macA;
  socket.on('clientAuth', (type: Client) => {
    if (type == 'node_client') {
      socket.join('clients');
    } else if (type == 'react_client') {
      // React client has joined
    } else {
      // Invalid client has joined -> goodbye!.
      socket.disconnect(true);
    }
  });

  // a machine has connected, check to see if it's new
  socket.on('initPerfData', async (data) => {
    macA = data.macA;

    try {
      await CheckAndAdd(macA, data);
    } catch (error) {
      console.log(error);
    }
  });
  socket?.on('prefData', (data) => {
    // console.log(data);
  });
}

const CheckAndAdd = async (macA: string, sent_data: any) => {
  try {
    //console.log(data, 'asdsad');
    const curr_machine = await Machine.findOne({ macA: macA });
    if (curr_machine === null) {
      // Not found in db
      sent_data.data['macA'] = macA;
      console.log(sent_data.data);
      let machine = new Machine(sent_data.data);
      machine.save();
    } else {
      return 'found!';
    }
  } catch (error) {
    throw error;
  }
};

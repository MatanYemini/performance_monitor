import io from 'socket.io-client';
import { IConfig } from './src/models/AppSettings';
import { OsData } from './src/models/OsData';

const os_data = OsData.getInstance();
const config = require('./configs/server-settings.json');
os_data.updateData();
const num_processes = os_data.numOfCores;
const _config = config as IConfig;

const socket = io(`${_config.host}:${_config.port}`);
os_data.performanceData().then((data) => {
  console.log(data);
});

socket.on('connect', () => {
  console.log('I have connected to the socket server!');
});

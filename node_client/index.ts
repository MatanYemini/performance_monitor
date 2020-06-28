import io from 'socket.io-client';
import os, { cpus } from 'os';
import { IConfig } from './src/models/AppSettings';
import { OsData } from './src/models/OsData';

const os_data = OsData.getInstance();
const config = require('./configs/server-settings.json');
os_data.updateData();
const num_processes = os_data.numOfCores;
const _config = config as IConfig;

const MAC_DEFAULT = '00:00:00:00:00:00';
const socket = io(`${_config.host}:${_config.port}`);

socket.on('connect', () => {
  console.log('conneted');
  // Identify this machine
  const net_inter = os.networkInterfaces();
  let macA: any;
  // Find a non internal network interface
  for (let key in net_inter) {
    if (!net_inter[key]![0].internal) {
      if (net_inter[key]![0].mac === MAC_DEFAULT) {
        macA = Math.random().toString(36).substr(2, 15);
      } else {
        macA = net_inter[key]![0].mac;
      }
      macA = net_inter[key]![0];
      break;
    }
  }

  // Auth as node client - as node client
  socket.emit('clientAuth', _config.type);
  os_data.performanceData().then((performance_data) => {
    let performance_to_send: any = performance_data;
    [performance_to_send.cpus, performance_to_send.cpuModal] = [
      performance_data.cpus?.length,
      performance_data.cpuModal?.toString(),
    ];
    socket.emit('initPerfData', {
      data: performance_data,
      macA: macA['address'],
    });
  });
  let performance_interval = setInterval(() => {
    os_data.performanceData().then((performance_data) => {
      let performance_to_send: any = performance_data;
      [performance_to_send.cpus, performance_to_send.cpuModal] = [
        performance_data.cpus?.length,
        performance_data.cpuModal?.toString(),
      ];
      socket.emit('prefData', {
        data: performance_data,
        macA: macA['address'],
      });
    });
  }, 1000);

  socket.on('disconnect', () => {
    clearInterval(performance_interval);
  });
});

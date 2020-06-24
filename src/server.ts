import express from 'express';
import { OsData } from './utils/OsData';
import cluster from 'cluster';
import farmhash from 'farmhash';
import io_redis from 'socket.io-redis';
import net from 'net';
import socketio from 'socket.io';
import { IConfig } from '../src/utils/general/AppSettings';
import socketMain from './socket-main';

const config = require('./configs/server-settings.json');

export const os_data = OsData.getInstance();

const num_processes = os_data.numOfCores;
const _config = config as IConfig;

type Worker = cluster.Worker;

const Server = () => {
  if (cluster.isMaster) {
    // This stores our workers. so we will able to reference them based on source IP address.
    // It is also useful for auto-restart
    let workers: Worker[] = [];

    // Helper for spawing worker
    let spawn = function (i: number): void {
      workers[i] = cluster.fork();

      // Restart worker at exit
      workers[i].on('exit', function (): void {
        spawn(i);
      });
    };

    // Spawn workers
    for (let i = 0; i < num_processes!; i++) {
      spawn(i);
    }

    // To enable the sticky connection (the fingerprint will be the same for the same ip)
    // So, every worker index will represent a different client
    const worker_index = function (ip: string | Buffer, len: number) {
      return farmhash.fingerprint32(ip) % len;
    };

    // in this case, we are going to start up a tcp connection via the net
    // module INSTEAD OF the http module. Express will use http, but we need
    // an independent tcp port open for cluster to work. This is the port that
    // will face the internet
    const server = net.createServer({ pauseOnConnect: true }, (connection) => {
      // We received a connection and need to pass it to the appropriate
      // worker. Get the worker for this connection's source IP and pass
      // it the connection.
      let worker =
        workers[worker_index(connection.remoteAddress!, num_processes!)];
      worker.send('sticky-session:connection', connection);
    });
  } else {
    let app = express();
    // Not exposing our internal server to outside world
    const server = app.listen(0, 'localhost');
    // console.log('worker listen..');
    const io = socketio(server);

    // Tell socket.io to use the redis adapter. the redis server is assumed to be at localhost:6379
    io.adapter(io_redis({ host: 'localhost', port: 6379 }));
  }
};

export { Server };

import { Server } from './src/server';
// import { IConfig } from './src/utils/general/AppSettings';
// const config = require('./configs/server-settings.json');

const start = async () => {
  //   const _config = config as IConfig;

  //   server.listen(_config.port, () => {
  //     console.log(`running on ${_config.host} : ${_config.port}`);
  //   });
  Server();
};

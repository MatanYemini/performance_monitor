import io from 'socket.io-client';
const config = require('../configs/client-settings.json');

let socket = io.connect(`http://${config.host}:${config.port}`);
socket.emit('clientAuth', config.auth);

export default socket;

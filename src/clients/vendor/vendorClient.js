
'use strict';

require('dotenv').config();
const { io } = require('socket.io-client');
const SOCKET_URL = `http://localhost:3001/updates`;

class VendorClient {
  constructor(queueId){
    this.queueId = queueId;
    this.socket = io(SOCKET_URL);
    this.socket.emit('JOIN', {queueId});
    this.socket.on('JOIN', (id) => {
      console.log('Joined Vendor Queue!', id);
    });
  }

  publish(event, payload){
    this.socket.emit(event, {queueId: this.queueId, ...payload});
  }

  subscribe(event, callback){
    this.socket.on(event, callback);
  }
}

module.exports = VendorClient;
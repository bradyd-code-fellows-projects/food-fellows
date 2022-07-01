'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = 3001 || 3002;
const Queue = require('./lib/queue');

// http://localhost:3001
const server = new Server(PORT);
const updates = server.of('/updates');
const updateQueue = new Queue();

updates.on('connection', (socket) => {
  console.log('joined the updates name space', socket.id);

  socket.onAny((event, payload) => {
    let time = new Date();
    console.log('EVENT:', {event, time, payload});
  });

  socket.on('JOIN', (queueId) => {
    socket.join(queueId);
    socket.emit('JOIN', queueId);
  });

  socket.on('ORDER', (payload) => {
    let currentQueue = updateQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = updateQueue.store(payload.queueId, new Queue());
      currentQueue = updateQueue.read(queueKey);
    }
    currentQueue.store(payload.updateId, payload);
    updates.emit('ORDER', payload);
  });

  socket.on('READY_FOR_PICKUP', (payload) => {
    let currentQueue = updateQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = updateQueue.store(payload.queueId, new Queue());
      currentQueue = updateQueue.read(queueKey);
    }
    currentQueue.store(payload.updateId, payload);
    updates.emit('READY_FOR_PICKUP', payload);
  });

  socket.on('IN_TRANSIT', (payload) => {
    let currentQueue = updateQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = updateQueue.store(payload.queueId, new Queue());
      currentQueue = updateQueue.read(queueKey);
    }
    currentQueue.store(payload.updateId, payload);
    updates.emit('IN_TRANSIT', payload);
  });

  socket.on('ACKNOWLEDGED', (payload) => {
    let currentQueue = updateQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = updateQueue.store(payload.queueId, new Queue());
      currentQueue = updateQueue.read(queueKey);
    }
    currentQueue.store(payload.updateId, payload);
    updates.emit('ACKNOWLEDGED', payload);
  });

  socket.on('DELIVERED', (payload) => {
    let currentQueue = updateQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = updateQueue.store(payload.queueId, new Queue());
      currentQueue = updateQueue.read(queueKey);
    }
    currentQueue.store(payload.updateId, payload);
    updates.emit('DELIVERED', payload);
  });

  socket.on('THANK_YOU', (payload) => {
    let currentQueue = updateQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = updateQueue.store(payload.queueId, new Queue());
      currentQueue = updateQueue.read(queueKey);
    }
    currentQueue.store(payload.updateId, payload);
    updates.emit('THANK_YOU', payload);
    // updateQueue.remove(); come back to this
  });

  socket.on('RECEIVED', (payload) => {
    let currentQueue = updateQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('no queue created for this update');
    }
    let update = currentQueue.remove(payload.updateId);
    updates.to(payload.queueId).emit('RECEIVED', update);
  });

  // expect this would work GREAT if we weren't just logging to the terminal AND we were persisting data in a DB ir our Server never shut off
  // socket.on('GET-UPDATES', (payload) => {
  //   console.log('does this even run');
  //   let currentQueue = updateQueue.read(payload.queueId);
  //   Object.keys(currentQueue.data).forEach(updateId => {
  //     updates.emit('UPDATE', currentQueue.read(updateId));
  //   });
});

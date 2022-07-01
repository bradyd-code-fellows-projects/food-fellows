'use strict';

const vendorClient = require('../vendor/vendorClient');
const { io } = require('socket.io-client');

jest.mock('socket.io-client', () => {
  return {
    io: jest.fn(() => {
      return {
        on: jest.fn(),
        emit: jest.fn(),
      };
    }),
  };
});

describe('Client Tests', () => {
  test('Call socket function for vendor on instantiation', () => {
    jest.clearAllMocks();
    let client = new vendorClient('new');
    expect(io).toHaveBeenCalledWith('http://localhost:3001/updates');
    expect(client.socket.emit).toHaveBeenCalledWith('JOIN', {queueId: 'new'});
    expect(client.socket.on).toHaveBeenCalled();
  });

});
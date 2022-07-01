'use strict';

const DriverClient = require('./driverClient');
const driver = new DriverClient('driver');

driver.subscribe('READY_FOR_PICKUP', (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: acknowledges order ${payload.orderId}, is now in transit to ${payload.address}`);
    driver.publish('IN_TRANSIT', payload);
  }, 2000);
});

driver.subscribe('IN_TRANSIT', (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: order ${payload.orderId} has been delivered to ${payload.customer}`);
    driver.publish('DELIVERED', payload);
  }, 2000);
});

'use strict';

const DriverClient = require('./driverClient');
const driver = new DriverClient('driver');

driver.subscribe('READY_FOR_PICKUP', (payload) => {
  console.log(`DRIVER: acknowledges order ${payload.orderId}, is now in transit to ${payload.address}`);
  driver.publish('IN-TRANSIT', payload);
});

driver.subscribe('ACKNOWLEDGED', (payload) => {
  // setTimeout(() => {
  console.log(`DRIVER: order ${payload.orderId} has been delivered to ${payload.customer}`);
  driver.publish('DELIVERED', payload);
  // }, 2000);
});

'use strict';

const CustomerClient = require('./customerClient');
const { Chance } = require('chance');
const chance = new Chance();
const customer = new CustomerClient('customer');

setInterval(() => {
  const order = {
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  customer.publish('ORDER', {customerId: chance.guid(), ...order});
  console.log(`CUSTOMER: placed order: ${order.orderId}`);
}, 10000);

customer.subscribe('DELIVERED', (payload) => {
  setTimeout(() => {
    console.log(`CUSTOMER: received order ${payload.orderId}`);
    customer.publish('THANK_YOU', payload);
  }, 3000);
});

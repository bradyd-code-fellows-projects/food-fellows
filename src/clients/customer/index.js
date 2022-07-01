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
}, 3000);

customer.subscribe('IN-TRANSIT', (payload) => {
  console.log('acknowledge works');
  customer.publish('ACKNOWLEDGED', payload);
});
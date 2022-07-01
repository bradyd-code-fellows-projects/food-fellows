'use strict';

const VendorClient = require('./vendorClient');
const { Chance } = require('chance');
const chance = new Chance();
const vendor = new VendorClient('vendor');

vendor.subscribe('ORDER', (payload) => {
  console.log(`VENDOR: received order ${payload.orderId} from customer ${payload.customerId}`);
  vendor.publish('READY_FOR_PICKUP', payload);
});


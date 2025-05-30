import mongoose from "mongoose";
import { env } from "../config/index.js";

import Campaign from "../models/campaign.model.js";
import Customer from "../models/customer.model.js";
import Order from "../models/order.model.js";

const seedCustomers = async () => {
  await Customer.deleteMany();
  const dummyCustomers = [];
  for (let i = 1; i <= 10; i++) {
    dummyCustomers.push({
      name: `Customer ${i}`,
      email: `customer${i}@gmail.com`,
      totalSpent: Math.floor(Math.random() * 20000),
      visits: Math.floor(Math.random() * 100),
      lastActive: new Date(
        Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365
      ),
    });
  }

  const customers = await Customer.insertMany(dummyCustomers);
  console.log("Customers seeded");
  return customers;
};

const seedOrders = async (customers) => {
  await Order.deleteMany();
  const dummyOrders = [];

  customers.forEach((customer) => {
    const numOrders = Math.floor(Math.random() * 3) + 1;
    for (let i = i; i < numOrders; i++) {
      dummyOrders.push({
        customerId: customer._id,
        amount: Math.floor(Math.random() * 10000),
        orderDate: new Date(
          Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365
        ),
      });
    }
  });

  const orders = await Order.insertMany(dummyOrders);
  console.log("Orders seeded");
};



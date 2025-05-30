import Order from "../models/order.model.js";
import { BaseService } from "./base.service.js";
import customerService from "./customer.service.js";

/**
 * Service for order-specific ops
 */
class OrderService extends BaseService {
  constructor() {
    super(Order);
  }

  /**
   * Creates a new order and updates the associated customer's statistics.
   * @param {Object} orderData - The data for the new order.
   * @param {import("mongoose").Types.ObjectId} orderData.customerId - The customer's ID.
   * @param {number} orderData.amount - The order amount.
   * @returns {Promise<Object>} The created order document.
   */
  async createOrderAndUpdateCustomer(orderData) {
    const order = await this.model.create(orderData);
    await customerService.updateStats(order.customerId, order.amount);
    return order;
  }
}

export default new OrderService();

import Customer from "../models/customer.model.js";
import { BaseService } from "./base.service.js";

/**
 * Service for customer-specific operations.
 * Inherits basic CRUD from BaseService.
 */
class CustomerService extends BaseService {
  constructor() {
    super(Customer);
  }

  /**
   * Finds a customer by their email address.
   * @param {string} email - The customer's email.
   * @returns {Promise<Object|null>} The found customer or null if not found.
   */
  async findByEmail(email) {
    return await this.model.findOne({ email: email });
  }

  /**
   * Updates customer statistics: increments totalSpent and visits, sets lastActive.
   * @param {import("mongoose").Types.ObjectId} customerId - The customer's ID.
   * @param {number} amount - The amount to increment totalSpent by.
   * @returns {Promise<Object|null>} The updated customer document or null if not found.
   */
  async updateStats(customerId, amount) {
    return await this.model.findByIdAndUpdate(
      customerId,
      {
        $inc: {
          totalSpent: amount,
          visits: 1,
        },
        $set: {
          lastActive: new Date(),
        },
      }
    );
  }
}

export default new CustomerService();

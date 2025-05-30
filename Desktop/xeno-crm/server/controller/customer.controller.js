import customerService from "../services/customer.service.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { AppError } from "../utils/AppError.util.js";

class CustomerController {
  createCustomer = async (req, res, next) => {
    const { name, email } = req.body;

    const checkCustomerExists = await customerService.findByEmail(email);
    if (checkCustomerExists) throw new AppError("Customer already exists", 400);

    const customer = await customerService.create(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, customer, "Customer created successfully"));
  };
}

export const customerController = new CustomerController();

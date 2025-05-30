import orderService from "../services/order.service.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

class OrderController {
  createOrder = async (req, res, next) => {
    const order = await orderService.createOrderAndUpdateCustomer(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, order, "Order created successfully"));
  };
}

export const orderController = new OrderController();

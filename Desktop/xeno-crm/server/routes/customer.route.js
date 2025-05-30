import express from "express";

import { customerController } from "../controller/customer.controller.js";
import { catchAsync } from "../utils/catchAsync.util.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";

const router = express.Router();

router.post("/", catchAsync(customerController.createCustomer));

export default router;

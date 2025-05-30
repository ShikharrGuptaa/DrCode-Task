import express from 'express';

import { orderController } from '../controller/order.controller.js';
import { catchAsync } from '../utils/catchAsync.util.js';

const router = express.Router();

router.post("/", catchAsync(orderController.createOrder));

export default router;
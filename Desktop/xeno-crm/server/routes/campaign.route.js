import express from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { campaignController } from "../controller/campaign.controller.js";
import { catchAsync } from "../utils/catchAsync.util.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  catchAsync(campaignController.createCampaign)
);
router.get(
  "/",
  isAuthenticated,
  catchAsync(campaignController.getAllCampaigns)
);

export default router;

import express from "express";
import passport from "passport";

import { authController } from "../controller/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { catchAsync } from "../utils/catchAsync.util.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  authController.loginSuccess
);

router.post("/logout", isAuthenticated, catchAsync(authController.logout));

router.get("/me", isAuthenticated, catchAsync(authController.currentUser));

export default router;

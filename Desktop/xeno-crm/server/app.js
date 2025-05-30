import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

import customerRouter from "./routes/customer.route.js";
import orderRouter from "./routes/order.route.js";
import campaignRouter from "./routes/campaign.route.js";
import authRouter from "./routes/auth.route.js";
import "./config/googleOAuth.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

const { json } = bodyParser;

app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/campaigns", campaignRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

app.use((req, res, next) => {
  res.send("XENO backend is running");
});

export default app;

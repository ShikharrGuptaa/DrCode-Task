import jwt from "jsonwebtoken";
import { env } from "../config/index.js";

export const createJwtToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, env.JWT_SECRET, {
    "expiresIn": "1d",
  });
};

export const verifyJwtToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

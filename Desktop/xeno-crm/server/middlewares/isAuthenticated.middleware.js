import { AppError } from "../utils/AppError.util.js";
import { verifyJwtToken } from "../utils/jwtToken.util.js";

export const isAuthenticated = (req, res, next) => {
  const jwtToken = req.cookies.jwtToken;

  if (!jwtToken) {
    return res.status(401).json(new AppError(401, "You are not authorised"));
  }

  try {
    const decoded = verifyJwtToken(jwtToken);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError(401, "Invalid or expired token. Please login again."));
  }
};

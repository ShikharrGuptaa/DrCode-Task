import { ApiResponse } from "../utils/ApiResponse.util.js";
import { createJwtToken } from "../utils/jwtToken.util.js";

class AuthController {
  loginSuccess(req, res, next) {
    const jwtToken = createJwtToken(req.user);
    res
      .cookie("jwtToken", jwtToken, { httpOnly: true, path: "/" })
      .redirect("/dashboard");
  }

  logout(req, res, next) {
    res
      .clearCookie("jwtToken", { httpOnly: true, path: "/" })
      .json(new ApiResponse(200, null, "logged out successfully"));
  }

  currentUser(req, res, next) {
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          req.user,
          "Current user details retrieved successfully"
        )
      );
  }
}

export const authController = new AuthController();

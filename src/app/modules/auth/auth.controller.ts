import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res, next) => {
  const { body } = req.body;
  const result = await AuthServices.loginUser(body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    // secure: config.NODE_ENV === 'production',
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  sendResponse(res, {
    success: true,
    message: "Login successful",
    statusCode: StatusCodes.OK,
    data: {
      accessToken,
    },
  });
});

export const AuthController = {
  loginUser,
};

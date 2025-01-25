import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res, next) => {
    const { body } = req.body;
    const token = await AuthServices.loginUser(body);
    sendResponse(res, {
      success: true,
      message: "Login successful",
      statusCode: StatusCodes.OK,
      data: {
        token,
      },
    });
  });


export const AuthController = {
    loginUser,
};
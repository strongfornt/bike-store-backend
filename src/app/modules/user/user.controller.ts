import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
const registerUser = catchAsync(async (req, res, next) => {
  // const { data } = req.body;
  const result = await UserService.registerUserIntoDB(req?.body);
  const { _id, name, email } = result;
  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: 201,
    data: {
      _id,
      name,
      email,
    },
  });
});



export const UserController = {
  registerUser,
};

import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getAllUser = catchAsync(async (req, res, next) => {
  const result = await AdminService.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    message: "Users retrieved successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
 // const { data } = req.body; // data: { isBlocked: boolean }
 const actionAdminId = req?.user?.userId

  const data = req.body
  const payload = {
    userId,
    data,
    actionAdminId
  };
  await AdminService.updateUserStatusIntoDB(payload);

  const message = data?.isBlocked === true ? "User deactivated successfully" : "User activated successfully"
  sendResponse(res, {
    success: true,
    message: message,
    statusCode: StatusCodes.OK,
  });
});

export const AdminController = {
  getAllUser,
  updateUserStatus,
};

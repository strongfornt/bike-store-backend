import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getAllUser = catchAsync(async (req, res, next) => {
  const query = req.query
  const result = await AdminService.getAllUsersFromDB(query);
  sendResponse(res, {
    success: true,
    message: "Users retrieved successfully",
    statusCode: StatusCodes.OK,
    totalCount:result?.totalCount,
    data: result?.result,
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



const updateOrderStatus = catchAsync ( async (req, res, next) => {
  const { orderId } = req.params;
  
  const payload = {
    ...req.body,
    orderId
  }

  // console.log(payload);
  
  const result = await AdminService.updateOrderStatusIntoDB(payload)

  sendResponse(res, {
    success: true,
    message: 'Order status updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });

})

const addEstimateDeliveryDateIntoOrder = catchAsync( async (req, res, next) => {
  const { orderId } = req.params;
  const payload = {
    orderId,
    ...req.body,
  }

  const result = await AdminService.addEstimateDeliveryDateIntoDB(payload)

  sendResponse(res, {
    success: true,
    message: 'Added Estimate delivery date successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });

})


export const AdminController = {
  getAllUser,
  updateUserStatus,
  updateOrderStatus,
  addEstimateDeliveryDateIntoOrder
};

import { orderServices } from "./order.service";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { IOrderDetails } from "./order.interface";

// create order =================================================================
const createOrder = catchAsync(async (req, res, next) => {
  // const { data } = req.body;
  const user = req?.user;
  const payload = {
    data: {
      ...req?.body,
      email: user!.email,
    },
    user,
  };
  const result = await orderServices.createOrderIntoDB(
    payload as IOrderDetails
  );
  sendResponse(res, {
    success: true,
    message: "Order created successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// calculate orders revenue
const calculateTotalRevenue = catchAsync(async (req, res, next) => {
  const result = await orderServices.calculateRevenueIntoDB();
  sendResponse(res, {
    success: true,
    message: "Revenue calculated successfully",
    statusCode: StatusCodes.OK,
    data: {
      totalRevenue: result,
    },
  });
});

export const orderController = {
  createOrder,
  calculateTotalRevenue,
};

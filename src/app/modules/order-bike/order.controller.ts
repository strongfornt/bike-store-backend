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
    data: req.body,
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

const verifyPayment = catchAsync(async (req, res) => {
  const {orderID} = req.params;
  const order = await orderServices.verifyPayment(orderID as string);
  sendResponse(res, {
    success: true,
    message: "Order verified successfully",
    statusCode: StatusCodes.OK,
    data: order,
  });
 
});

//get users order
const getOrders = catchAsync(async (req, res) => {
  const user = req?.user;
  const {email} = user!.email;
  const order = await orderServices.getOrdersFromDB(email);

  sendResponse(res, {
    success: true,
    message: "Order retrieved successfully",
    statusCode: StatusCodes.OK,
    data: order,
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
  verifyPayment,
  getOrders
};

import { Request, Response } from "express";
import orderZodValidationSchema from "./order.zod.validation";
import { orderServices } from "./order.service";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

// create order =================================================================
const createOrder = catchAsync(async (req, res, next) => {
  const { data } = req.body;
  const result = await orderServices.createOrderIntoDB(data);
  sendResponse(res, {
    success: true,
    message: "Order created successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
})

// calculate orders revenue 
const calculateTotalRevenue = catchAsync(async (req, res, next) => {
  
  const result = await orderServices.calculateRevenueIntoDB();
  sendResponse(res, {
    success: true,
    message: "Revenue calculated successfully",
    statusCode: StatusCodes.OK,
    data: {
      totalRevenue: result
    },
  });
})

export const orderController = {
  createOrder,
  calculateTotalRevenue,
};

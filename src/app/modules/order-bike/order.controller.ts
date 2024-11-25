import { Request, Response } from "express";
import orderZodValidationSchema from "./order.zod.validation";
import { orderServices } from "./order.service";

// create order =================================================================
const createOrder = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    // parse the data using zod validation
    const zodParserData = orderZodValidationSchema.parse(data);
    // create order in database
    const result = await orderServices.createOrderIntoDB(zodParserData);
    res.status(200).json({
      message: "Order created successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 400).json({
      message:error.message || "validation failed",
      status: false,
      error: error,
      stack: error.stack,
    });
  }
};

// calculate orders revenue 
const calculateTotalRevenue = async (req: Request, res: Response) => {
  try {
      const result = await orderServices.calculateRevenueIntoDB();
      res.status(200).json({
        message: "Revenue calculated successfully",
        status: true,
        data: {
          totalRevenue: result
        },
      });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to calculate revenue",
      status: false,
      error,
      stack: error.stack,
    });
  }
}

export const orderController = {
  createOrder,
  calculateTotalRevenue,
};

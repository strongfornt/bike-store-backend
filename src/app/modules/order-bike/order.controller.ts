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

export const orderController = {
  createOrder,
};

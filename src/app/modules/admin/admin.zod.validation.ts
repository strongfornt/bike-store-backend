import { z } from "zod";

const dateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;

const userActiveZodValidationSchema = z.object({
  isBlocked: z.boolean({ required_error: "Must be send true or false" }),
});

const updateOrderStatusValidationSchema = z.object({
  orderStatus: z.enum(["Pending", "Processing", "Shipped", "Delivered"]),
});
const updateOrderEstimateDeliveryDateValidationSchema = z.object({
  estimate_delivery_date: z
    .string({ required_error: "Order estimate date required" })
    .regex(dateRegex, { message: "Date must be in MM-DD-YYYY format" }),
});

export const adminValidationSchema = {
  userActiveZodValidationSchema,
  updateOrderStatusValidationSchema,
  updateOrderEstimateDeliveryDateValidationSchema,
};

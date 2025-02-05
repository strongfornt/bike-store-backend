import { z } from "zod";

const orderZodValidationSchema = z.array(
  z.object({
    id: z.string({ required_error: "Product ID is required" }),
    quantity: z.number({ required_error: "quantity is required" }).default(1),
  }).strict(),
).nonempty("Product list cannot be empty");



export const OrderValidationSchema = {
  orderZodValidationSchema,
};

// export default orderZodValidationSchema;

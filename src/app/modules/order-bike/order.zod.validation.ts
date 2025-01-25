import { z } from "zod";

const orderZodValidationSchema = z.object({
  data: z.object({
    email: z.string().email("Invalid email address"),
    product: z.string({ required_error: "Product name is required" }),
    quantity: z
      .number()
      .int("Quantity must be an integer")
      .min(1, "Quantity must be at least 1"),
    totalPrice: z.number().min(0, "Total price must be at least 0"),
  }),
});

export default orderZodValidationSchema;

import { z } from "zod";

 const bikeZodValidationSchema = z.object({
  name: z.string({required_error:"Name is required"}),
  // brand: z.string({required_error:"Brand is required"}),
  brand:z.enum(["Yamaha", "Suzuki", "Honda", "Bajaj", "Hero", "TVS"]),
  price: z.number().min(0, "Price must be a positive number"),
  category: z
    .enum(["Mountain", "Road", "Hybrid", "Electric"]),
  description: z.string({required_error:'Description is required'}),
  quantity: z.number().int().min(0).default(1),
  // inStock: z.boolean().default(true),
}).strict();

 const bikeUpdateZodValidationSchema = z.object({
  name: z.string({required_error:"Name is required"}).optional(),
  // brand: z.string({required_error:"Brand is required"}).optional(),
  brand:z.enum(["Yamaha", "Suzuki", "Honda", "Bajaj", "Hero", "TVS"]).optional(),
  price: z.number().min(0, "Price must be a positive number").optional(),
  category: z.enum(["Mountain", "Road", "Hybrid", "Electric"]).optional(),
  description: z.string({required_error:'Description is required'}).optional(),
  quantity: z.number().int().min(0).optional(),
  // inStock: z.boolean().optional(),
}).strict()

export const BikeValidationZodSchema = {
  bikeZodValidationSchema,
  bikeUpdateZodValidationSchema,
}

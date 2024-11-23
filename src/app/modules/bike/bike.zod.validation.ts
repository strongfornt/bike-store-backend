import { z } from "zod";

export const bikeZodValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  brand: z.string().nonempty("Brand is required"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z
    .enum(["Mountain", "Road", "Hybrid", "Electric"]),
  description: z.string().nonempty("Description is required"),
  quantity: z.number().int().min(1).default(1),
  inStock: z.boolean().default(true),
});

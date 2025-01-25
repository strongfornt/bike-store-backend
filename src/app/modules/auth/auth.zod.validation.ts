import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
      email: z
       .string({
          required_error: "Email is required",
        })
       .email("Invalid email format")
       .trim()
       .toLowerCase(),
      password: z
       .string({
          required_error: "Password is required",
        })
       .min(4, "Password must be at least 4 characters long"),
    }).strict(),
  })
  

export const AuthValidationSchema = {
    loginValidationSchema
}  
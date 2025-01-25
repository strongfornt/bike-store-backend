import { z } from "zod";

// Validation for the userNameSchema

// Validation for the userSchema
const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
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
  })
  .strict(),
});




// Type inference from the schema
export const UserValidationSchema = {
  registerUserValidationSchema,
};

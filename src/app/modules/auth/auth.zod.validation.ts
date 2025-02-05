import { z } from "zod";

const loginValidationSchema = z.object({
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
  }).strict()
const changePassValidationSchema = z.object({
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
        }),
      //  .min(4, "Password must be at least 4 characters long"),
      newPassword: z
       .string({
          required_error: "Password is required",
        })
       .min(4, "Password must be at least 4 characters long"),
  }).strict()
  // const refreshTokenValidationSchema = z.object({
  //   refreshToken: z.string({
  //     required_error: 'Refresh token is required!',
  //   }),
  // }).strict();
  

export const AuthValidationSchema = {
    loginValidationSchema,
    changePassValidationSchema
}  
import { z } from "zod";

const userActiveZodValidationSchema = z.object({
    isBlocked:z.boolean({required_error: "Must be send true or false"})
})


export const adminValidationSchema = {
    userActiveZodValidationSchema
}
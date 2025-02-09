import { z } from "zod";

const userActiveZodValidationSchema = z.object({
    isBlocked:z.boolean({required_error: "Must be send true or false"})
})

const updateOrderStatusValidationSchema = z.object({
    orderStatus: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered'])
})

export const adminValidationSchema = {
    userActiveZodValidationSchema,
    updateOrderStatusValidationSchema
}
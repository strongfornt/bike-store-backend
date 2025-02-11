import { z } from "zod";

const userActiveZodValidationSchema = z.object({
    isBlocked:z.boolean({required_error: "Must be send true or false"})
})

const updateOrderStatusValidationSchema = z.object({
    orderStatus: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered'])
})
const updateOrderEstimateDeliveryDateValidationSchema = z.object({
    estimate_delivery_date: z.string({required_error: "Order estimate date required"})
})

export const adminValidationSchema = {
    userActiveZodValidationSchema,
    updateOrderStatusValidationSchema,
    updateOrderEstimateDeliveryDateValidationSchema
}
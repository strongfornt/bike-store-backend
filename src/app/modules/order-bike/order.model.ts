import { Schema, model, connect } from "mongoose";
import { Order } from "./order.interface";

const orderModel = new Schema<Order>({
    email: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true }
},
{versionKey:false,timestamps:true }
);


export const OrderModel = model<Order>("Order", orderModel);
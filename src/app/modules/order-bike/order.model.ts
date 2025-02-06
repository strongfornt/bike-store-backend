import { Schema, model, connect } from "mongoose";
import { Order } from "./order.interface";

const productSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Bike", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
  },
  { _id: false }
);

const orderModel = new Schema<Order>(
  {
    email: { type: String, required: true },
    products: [productSchema],
    totalPrice: { type: Number, required: true },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
    orderStatus: {
      type: String,
      enum: ['Processing', 'Pending', 'Delivered', 'Shipped'],
      required: true
    },
    estimate_delivery_date: { type: String, required: true}
  },
  { versionKey: false, timestamps: true }
);

export const OrderModel = model<Order>("Order", orderModel);

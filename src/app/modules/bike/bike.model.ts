import { Schema, model, connect } from "mongoose";
import { Bike } from "./bike.interface";

const bikeSchema = new Schema<Bike>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true,min: 0},
    category: {
      type: String,
      enum: ["Mountain", "Road", "Hybrid", "Electric"],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, default: 1,min:1},
    inStock: { type: Boolean, default: true }
  },
  {versionKey:false,timestamps:true }
  
);

export const BikeModel = model<Bike>("Bike", bikeSchema);

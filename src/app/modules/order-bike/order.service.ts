import { CustomError } from "../../errors/custom.error";
import { BikeModel } from "../bike/bike.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (order: Order) => {
  const { email, product, quantity, totalPrice } = order;
  const bikeData = await BikeModel.findById(product);

  if (!bikeData) {
    throw new CustomError("Product not found", 404);
  }

  // Check if the stock is sufficient
  if (bikeData.quantity < quantity) {
    throw new CustomError("Insufficient stock", 400);
  }

  // Step 2: Reduce the quantity
  bikeData.quantity -= quantity;

  // If quantity reaches 0, set inStock to false
  if (bikeData.quantity === 0) {
    bikeData.inStock = false;
  }

  // Save the updated  document
  await bikeData.save();

  // Step 3: Create the order and insert into the Order collection
  const response = await OrderModel.create(order);
  return response;
};

// Calculate Revenue from Orders
const calculateRevenueIntoDB = async () => {
  const response = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ]);

  const totalRevenue = response.length > 0 ? response[0].totalRevenue : 0;

  return totalRevenue;
};

export const orderServices = {
  createOrderIntoDB,
  calculateRevenueIntoDB,
};

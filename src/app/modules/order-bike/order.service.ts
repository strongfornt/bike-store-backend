import { CustomError } from "../../errors/custom.error";
import { BikeModel } from "../bike/bike.model";
import { Order, IOrderDetails } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (order: IOrderDetails) => {
  const { data, user } = order;
  const {product, quantity, totalPrice} = data
  const bikeData = await BikeModel.findById(product);

  if (!bikeData) {
    throw new CustomError(404,"Product not found" );
  }

  // Check if the stock is sufficient
  if (bikeData.quantity < quantity) {
    throw new CustomError( 400,"Insufficient stock");
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
  const response = await OrderModel.create(order?.data);

  // const shurjopayPayload = {
  //   amount: totalPrice,
  //   order_id: response._id,
  //   currency: "BDT",
  //   customer_name: user.name,
  //   customer_address: 'N/A',
  //   customer_email: user.email,
  //   customer_phone: 'N/A',
  //   customer_city: 'N/A',
  //   // client_ip,
  // };

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

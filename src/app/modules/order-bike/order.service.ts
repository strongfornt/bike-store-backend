import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { CustomError } from "../../errors/custom.error";
import { BikeModel } from "../bike/bike.model";
import { IOrderDetails } from "./order.interface";
import { OrderModel } from "./order.model";
import { orderUtils } from "./order.util";
import QueryBuilder from "../../builder/Query.builder";

const createOrderIntoDB = async (order: IOrderDetails) => {
  const { data, user } = order;

  let totalPrice = 0;
  const productDetails = (
    await Promise.all(
      data?.map(async (item) => {
        const product = await BikeModel.findById(item.id);
        // console.log(product);

        if (!product) return null;
        if (product.quantity < item?.quantity) {
          return null;
        }
        product.quantity -= item?.quantity;

        if (product.quantity === 0) {
          product.inStock = false;
        }
        await product.save();
        const subtotal = product.price * item.quantity;
        totalPrice += subtotal;
        return {
          productId: item.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          subtotal,
        };
      })
    )
  ).filter(Boolean);

  if (!productDetails.length) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "No products selected");
  }
  // const today = new Date();
  // const estimatedDeliveryDate = new Date();
  // estimatedDeliveryDate.setDate(today.getDate() + 3);

  // const formattedDate = `${
  //   estimatedDeliveryDate.getMonth() + 1
  // }/${estimatedDeliveryDate.getDate()}/${estimatedDeliveryDate.getFullYear()}`;

  const orderData = {
    email: user?.email,
    products: productDetails,
    totalPrice,
    orderStatus: "Pending",
    // estimate_delivery_date: formattedDate,
  };

  let response: any = await OrderModel.create(orderData);

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: response._id,
    currency: "BDT",
    customer_name: user.name,
    customer_address: "N/A",
    customer_email: user.email,
    customer_phone: "N/A",
    customer_city: "N/A",
    client_ip: "127.0.0.1",
  };
  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    await OrderModel.findByIdAndUpdate(response?._id, {
      $set: {
        "transaction.id": payment.sp_order_id,
        "transaction.transactionStatus": payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

//verify order
const verifyPayment = async (orderID: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(orderID);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      { "transaction.id": orderID },
      {
        $set: {
          "transaction.bank_status": verifiedPayment[0].bank_status,
          "transaction.sp_code": verifiedPayment[0].sp_code,
          "transaction.sp_message": verifiedPayment[0].sp_message,
          "transaction.transactionStatus":
            verifiedPayment[0].transaction_status,
          "transaction.method": verifiedPayment[0].method,
          "transaction.date_time": verifiedPayment[0].date_time,
          status:
            verifiedPayment[0].bank_status === "Success"
              ? "Paid"
              : verifiedPayment[0].bank_status === "Failed"
              ? "Pending"
              : verifiedPayment[0].bank_status === "Cancel"
              ? "Cancelled"
              : "",
        },
      },
      { new: true }
    );
  }

  return verifiedPayment;
};

//get all order
const getOrdersFromDB = async (email: string) => {
  const orders = await OrderModel.find({ email })
    .sort({ createdAt: -1 })
    .select("-updatedAt");
  console.log(orders);

  return orders;
};
const getAllOrdersFromDB = async (query: any) => {
  const orders = new QueryBuilder(OrderModel.find(), query)
    .sort()
    .paginate()
    .excludeFields("-updatedAt");

  const response = await orders.modelQuery;
  const totalCount = await OrderModel.countDocuments()
  return {
    totalCount,
    response
  };
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
  verifyPayment,
  getOrdersFromDB,
  getAllOrdersFromDB,
};

import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../errors/custom.error";
import { UserModel } from "../user/user.model";
import { IDeactivatedUserIntoDB } from "./admin.interface";
import { OrderModel } from "../order-bike/order.model";
import { validOrderStatuses } from "./admin.const";

const getAllUsersFromDB = async () => {
  const response = await UserModel.find();
  return response;
};

const updateUserStatusIntoDB = async (payload: IDeactivatedUserIntoDB) => {
  const { userId, data, actionAdminId } = payload;

  if (userId === actionAdminId) {
    throw new CustomError(
      StatusCodes.FORBIDDEN,
      "Cannot block or unblock yourself!"
    );
  }

  const isUserAlreadyBlocked = await UserModel.findById(userId);

  if (data?.isBlocked === true && isUserAlreadyBlocked?.isBlocked === true) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "User is already blocked!");
  }

  if (data?.isBlocked === false && isUserAlreadyBlocked?.isBlocked === false) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "User is already unblocked!"
    );
  }

  const response = await UserModel.findByIdAndUpdate(userId, {
    $set: { ...data },
  });

  return response;
};

const updateOrderStatusIntoDB = async (payload: {
  orderStatus: string;
  orderId: string;
}) => {
  const { orderStatus, orderId } = payload;
  const isOrderExist = await OrderModel.findById(orderId);
  if (!isOrderExist) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Order not found!");
  }

  const currentStatus = isOrderExist?.orderStatus;

  if(isOrderExist?.orderStatus === 'Delivered' && orderStatus === 'Delivered'){
    throw new CustomError(StatusCodes.BAD_REQUEST, "Cannot update delivered order status!");
  }

  const currentStatusIndex = validOrderStatuses.indexOf(currentStatus);
  const newStatusIndex = validOrderStatuses.indexOf(orderStatus);


  // Ensure the new status is the next one in sequence
  if (newStatusIndex !== currentStatusIndex + 1) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      `Order status can only be updated from ${currentStatus} to ${
        validOrderStatuses[currentStatusIndex + 1]
      }.`
    );
  }

  const response = await OrderModel.findByIdAndUpdate(
    orderId,
    {
      $set: { orderStatus },
    },
    { new: true, runValidators: true }
  ).select("-createdAt -updatedAt");

  return response;
};

const addEstimateDeliveryDateIntoDB = async (payload: {
  orderId: string;
  estimate_delivery_date: string;
}) => {
  const { orderId, estimate_delivery_date } = payload;
  const isOrderExist = await OrderModel.findById(orderId);
  if (!isOrderExist) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Order not found!");
  }

  const createdDate = new Date(isOrderExist?.createdAt);
  const createdMonth = String(createdDate.getMonth()).padStart(2, "0");
  const createdDay = String(createdDate.getDate()).padStart(2, "0");
  const createdTime = `${createdMonth}-${createdDay}-${createdDate.getFullYear()} `;

  const deliveryDate = estimate_delivery_date.split("-")
  const [month, day, year] = deliveryDate;
  const deliveryMonth = month.padStart(2,"0")
  const deliveryDay = day.padStart(2,"0")
  const deliveryTime = `${deliveryMonth}-${deliveryDay}-${year}`
  
  console.log(createdTime, deliveryTime);
  
  if (deliveryTime < createdTime) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Estimate delivery date should be later than order creation date."
    );
  }

  const response = await OrderModel.findByIdAndUpdate(
    orderId,
    {
      $set: { estimate_delivery_date },
    },
    { new: true, runValidators: true }
  ).select("-createdAt -updatedAt");

  return response;
};

export const AdminService = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
  updateOrderStatusIntoDB,
  addEstimateDeliveryDateIntoDB,
};

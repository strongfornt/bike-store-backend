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

export const AdminService = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
  updateOrderStatusIntoDB,
};

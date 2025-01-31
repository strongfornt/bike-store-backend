import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../errors/custom.error";
import { UserModel } from "../user/user.model";
import { IDeactivatedUserIntoDB } from "./admin.interface";

const getAllUsersFromDB = async () => {
  const response = await UserModel.find();
  return response;
};

const updateUserStatusIntoDB = async (payload: IDeactivatedUserIntoDB) => {
  const { userId, data,actionAdminId } = payload;

    if(userId === actionAdminId) { 
        throw new CustomError(StatusCodes.FORBIDDEN, "Cannot block or unblock yourself!");
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

export const AdminService = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
};

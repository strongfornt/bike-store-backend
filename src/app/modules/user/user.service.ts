import { StatusCodes } from "http-status-codes";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { CustomError } from "../../errors/custom.error";

const registerUserIntoDB = async (payload: TUser) => {
  const response = await UserModel.create(payload);
  return response;
};

export const UserService = {
  registerUserIntoDB,
};

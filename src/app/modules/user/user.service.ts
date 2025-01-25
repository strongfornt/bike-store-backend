import { StatusCodes } from "http-status-codes";
import CustomError from "../../errors/Custom.error";
import { TUser } from "./user.interface"
import { UserModel } from "./user.model";


const registerUserIntoDB = async (payload: TUser) => {
    const isUserAlreadyExist = await UserModel.isUserExistsByEmail(payload?.email)

    if (isUserAlreadyExist) {
        throw new CustomError(StatusCodes.CONFLICT, "User already exists!");
    }

    const response = await UserModel.create(payload);
    return response
}





export const UserService = {
    registerUserIntoDB,
}
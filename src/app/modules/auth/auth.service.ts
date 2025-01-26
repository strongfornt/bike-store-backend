import { StatusCodes } from "http-status-codes";
import { UserModel } from "../user/user.model";
import { CustomError } from "../../errors/custom.error";
import config from "../../config";
import { createToken } from "./auth.utils";

const loginUser = async (payload: { email: string; password: string }) => {
  const isUserExists = await UserModel.isUserExistsByEmail(payload?.email);

  //checking is user exist
  if (!isUserExists) {
    throw new CustomError(StatusCodes.NOT_FOUND, "This user is not found!");
  }

  //checking is user blocked or not
  const userStatus = isUserExists?.isBlocked;
  if (userStatus) {
    throw new CustomError(StatusCodes.FORBIDDEN, "This user is Blocked!");
  }

  // checking is password matched
  if (
    !(await UserModel.isPasswordMatched(
      payload?.password,
      isUserExists?.password
    ))
  ) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  //create token and send to the client
  const jwtPayload = {
    userId: isUserExists?._id,
    role: isUserExists?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as number | string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string | number,
  );



  return {
    accessToken,
    refreshToken
  };
};

const changePasswordIntoDB = async (payload: { email: string; password: string; newPassword: string }) => {
  const isUserExists = await UserModel.isUserExistsByEmail(payload?.email);
   //checking is user exist
   if (!isUserExists) {
    throw new CustomError(StatusCodes.NOT_FOUND, "This user is not found!");
  }

    //checking is user blocked or not
    const userStatus = isUserExists?.isBlocked;
    if (userStatus) {
      throw new CustomError(StatusCodes.FORBIDDEN, "This user is Blocked!");
    }
  
     // checking is password matched
  if (
    !(await UserModel.isPasswordMatched(
      payload?.password,
      isUserExists?.password
    ))
  ) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }


  const response = await UserModel.findByIdAndUpdate(
    isUserExists?._id,
    { $set: { password: payload.newPassword } },
    { new: true, runValidators: true }
  )

return response

}


export const AuthServices = {
  loginUser,
  changePasswordIntoDB,
};

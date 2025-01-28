import { StatusCodes } from "http-status-codes";
import { UserModel } from "../user/user.model";
import { CustomError } from "../../errors/custom.error";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";

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
    email: isUserExists?.email,
    name: isUserExists?.name,
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
  const isUserExists = await UserModel.isUserExistsByEmail(payload?.email)
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

  // update pass 
   isUserExists.password = payload?.newPassword;

   const response = await isUserExists.save()

  // const response = await UserModel.findByIdAndUpdate(
  //   isUserExists?._id,
  //   { $set: { password: payload.newPassword } },
  //   { new: true, runValidators: true }
  // )

return response

}

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)

  const { userId, iat } = decoded;

  const isUserExists = await UserModel.isUserExistsByUserId(userId);

  if(!isUserExists) {
    throw new CustomError(StatusCodes.NOT_FOUND, "User not found");
  }

  if(isUserExists?.isBlocked){
    throw new CustomError(StatusCodes.FORBIDDEN, "This user is Blocked!");
  }

  const jwtPayload = {
    userId: isUserExists?._id, 
    name: isUserExists?.name, 
    email: isUserExists?.email,
    role: isUserExists?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as number | string,
  );

  return {
    accessToken
  }
}


export const AuthServices = {
  loginUser,
  changePasswordIntoDB,
  refreshToken
};

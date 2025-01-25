import { StatusCodes } from "http-status-codes";
import { UserModel } from "../user/user.model";
import { CustomError } from "../../errors/custom.error";
import config from "../../config";
import jwt from "jsonwebtoken"

const loginUser = async (payload: { email: string; password: string }) => {
  const isUserExists = await UserModel.isUserExistsByEmail(payload?.email);

  //checking is user exist
  if (!isUserExists) {
    throw new CustomError(StatusCodes.NOT_FOUND, "This user is not found!");
  }

  //checking is user blocked or not
  const userStatus = isUserExists?.isBlocked;
  if (userStatus) {
    throw new CustomError(StatusCodes.FORBIDDEN, "This user is blocked!");
  }

  // checking is password matched
  if (
    !(await UserModel.isPasswordMatched(
      payload?.password,
      isUserExists?.password
    ))
  ) {
    throw new CustomError(401, "Invalid credentials");
  }

  //create token and send to the client
  const jwtPayload = {
    userId: isUserExists?._id,
    role: isUserExists?.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: config.jwt_access_expires_in,
  });



  return token;
};

export const AuthServices = {
  loginUser,
};

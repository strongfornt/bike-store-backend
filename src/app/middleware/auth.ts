import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catch-async";
import CustomError from "../errors/Custom.error";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../modules/user/user.model";

const authMiddleware = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const Bearer_token = req.headers.authorization;
    // console.log(Bearer_token);
    const token = Bearer_token?.split(" ")[1];
    // console.log(token);

    //if the token sent from the client
    if (!token) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        "You are not authorized!"
      );
    }

    //checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    const { role, userId, iat } = decoded;
    // console.log(decoded);
    
    const isUserExists = await  UserModel.isUserExistsByUserId(userId)

    if (!isUserExists) {
      throw new CustomError(StatusCodes.NOT_FOUND, "This user is not found!");
    }

    //checking if the user is blocked
    const isBlocked = isUserExists?.isBlocked;

    if (isBlocked) {
      throw new CustomError(StatusCodes.FORBIDDEN, "This user is Blocked!");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        "You are not authorized!"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default authMiddleware;

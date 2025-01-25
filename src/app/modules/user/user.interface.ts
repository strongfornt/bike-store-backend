import { Model, Types } from "mongoose";
import { User_Role } from "./user.constant";

export interface TUser {
    _id?:Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "admin" | "customer";
}

export interface UserModelInterFace extends Model<TUser> {
    isUserExistsByEmail(email: string) :Promise<TUser>
    isUserExistsByUserId(id: string) : Promise <TUser>
    isPasswordMatched(plainTextPass: string, hashTextPass: string) : Promise<boolean>
}

export type TUserRole = keyof typeof User_Role
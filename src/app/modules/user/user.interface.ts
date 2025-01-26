import { Model, Types } from "mongoose";
import { User_Role } from "./user.constant";
import { Document } from "mongoose";
export interface TUser {
    _id?:Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "admin" | "customer";
    isBlocked: boolean;
}

export interface UserModelInterFace extends Model<TUser> {
    isUserExistsByEmail(email: string) :Promise<TUser & Document>
    isUserExistsByUserId(id: string) : Promise <TUser>
    isPasswordMatched(plainTextPass: string, hashTextPass: string) : Promise<boolean>
}

export type TUserRole = keyof typeof User_Role
import { JwtPayload } from "jsonwebtoken";

export interface Order {
    email: string;
    product: string;
    quantity: number;
    totalPrice: number;
}


export interface IOrderDetails {
    data: Order;
    user: JwtPayload
}
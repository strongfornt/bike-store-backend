import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

export interface Order {
  email: string;
  products: [{
    productId: string, 
    name: string,
    price: number,
    quantity:number,
    subtotal: number, 
  }];
  quantity: number;
  totalPrice: number;
  transaction: {
    id: string;
    transactionStatus: string;
  };
  orderStatus:'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  estimate_delivery_date: string;
  createdAt: Date;  
  updatedAt: Date; 
}

export interface IOrderDetails {
  data: {
    id: string;
    quantity: number;
    // email: string ;
  }[];
  user: JwtPayload;
}

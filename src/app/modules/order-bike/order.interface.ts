import { JwtPayload } from "jsonwebtoken";

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
}

export interface IOrderDetails {
  data: {
    id: string;
    quantity: number;
    // email: string ;
  }[];
  user: JwtPayload;
}

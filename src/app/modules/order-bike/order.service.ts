import { Order } from "./order.interface";
import { OrderModel } from "./order.model";


const createOrderIntoDB = async(order: Order) => {
    const response = await OrderModel.create(order);
    return response;
}


export const orderServices = {
    createOrderIntoDB,
}
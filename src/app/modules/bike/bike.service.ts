import { Bike } from "./bike.interface";
import { BikeModel } from "./bike.model";



const createBikeIntoDB = async(bike:Bike) => {
    const response = await BikeModel.create(bike);
    return response; 
}

export const bikeServices = {
    createBikeIntoDB,
}
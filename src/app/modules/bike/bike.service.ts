import { Bike } from "./bike.interface";
import { BikeModel } from "./bike.model";



const createBikeIntoDB = async(bike:Bike) => {
    const response = await BikeModel.create(bike);
    return response; 
}

const getAllBikesFromDB = async(filter: object) => { 
    const response = await BikeModel.find(filter);
    return response;
}
export const bikeServices = {
    createBikeIntoDB,
    getAllBikesFromDB
}
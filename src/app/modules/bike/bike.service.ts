import { ObjectId } from "mongoose";
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

// get specific bike from db =================================================================
const getSingleBikesFromDB = async(productId: string) => { 
    const response = await BikeModel.findOne({_id:productId});
    return response;
}

// update single bike data
const updateSingleBikeIntoDB = async (productId: string, updatedData:object) => {
    const response = await BikeModel.findOneAndUpdate({_id:productId}, updatedData, { new: true })
    return response;
}

export const bikeServices = {
    createBikeIntoDB,
    getAllBikesFromDB,
    getSingleBikesFromDB,
    updateSingleBikeIntoDB
}

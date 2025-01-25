import { ObjectId } from "mongoose";
import { Bike, IUpdatedBike } from "./bike.interface";
import { BikeModel } from "./bike.model";
import { CustomError } from "../../errors/custom.error";
import { StatusCodes } from "http-status-codes";

const createBikeIntoDB = async (bike: Bike) => {
  const response = await BikeModel.create(bike);
  return response;
};

const getAllBikesFromDB = async (filter: object) => {
  const response = await BikeModel.find(filter);
  return response;
};

// get specific bike from db =================================================================
const getSingleBikesFromDB = async (productId: string) => {
  const response = await BikeModel.findById(productId);

  if (!response) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Product not found!");
  }

  return response;
};

// update single bike data
const updateSingleBikeIntoDB = async (
  productId: string,
  payload: IUpdatedBike
) => {
  const isBikeExist = await BikeModel.findById(productId);

  if (!isBikeExist) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Product not found!");
  }

  const response = await BikeModel.findByIdAndUpdate(
    productId,
    { $set: { ...payload } },
    { new: true, runValidators: true }
  );

  return response;
};

// delete bike data =================================

const deleteSingleBikeFromDB = async (productId: string) => {
  const isBikeExist = await BikeModel.findById(productId);

  if (!isBikeExist) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Product not found!");
  }

  const response = await BikeModel.findByIdAndDelete(productId);

  return response;
};

export const bikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getSingleBikesFromDB,
  updateSingleBikeIntoDB,
  deleteSingleBikeFromDB,
};

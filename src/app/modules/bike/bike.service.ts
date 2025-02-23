import { Bike, IUpdatedBike } from "./bike.interface";
import { BikeModel } from "./bike.model";
import { CustomError } from "../../errors/custom.error";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/Query.builder";
import { BikeSearchAbleFields } from "./bike.constant";

const createBikeIntoDB = async (bike: Bike) => {
  const createdData = await BikeModel.create(bike);
  const response = await BikeModel.findById(createdData?._id).select(
    "-createdAt -updatedAt"
  );
  return response;
};

const getAllBikesFromDB = async (query: any) => {
  const response = new QueryBuilder(BikeModel.find(), query)
    .search(BikeSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .excludeFields("-createdAt -updatedAt");
  const result = await response.modelQuery;
  return result;
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

  if( response?.inStock === false && response?.quantity > 0) {
    response.inStock = true;
    await response.save();
  }

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

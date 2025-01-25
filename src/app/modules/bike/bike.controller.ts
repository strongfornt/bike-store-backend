import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { bikeServices } from "./bike.service";

// create bike =================================================================
const createBike = catchAsync(async (req, res, next) => {
  const { data } = req.body;
  const result = await bikeServices.createBikeIntoDB(data);
  sendResponse(res, {
    success: true,
    message: "Bike created successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// get bikes =================================================================

const getAllBike = catchAsync(async (req, res, next) => {
  const result = await bikeServices.getAllBikesFromDB(req?.query)
  sendResponse(res, {
    success: true,
    message: "Bikes retrieved successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });

})

// get specific bike by id =================================
const getSingleBike = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const result = await bikeServices.getSingleBikesFromDB(productId);
  sendResponse(res, {
    success: true,
    message: "Bike retrieved successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// update bike by id ============================================================
const updateSingleBike = catchAsync(async (req, res, next) => {
    const {productId} = req.params;
    const {data} = req.body;

    const result = await bikeServices.updateSingleBikeIntoDB(productId, data)

    sendResponse(res, {
      success: true,
      message: "Bike updated successfully",
      statusCode: StatusCodes.OK,
      data: result,
    });
  
})


// delete bike from db by _id =================================
const deleteSingleBike = catchAsync(async(req, res, next) => {
  const { productId } = req.params;
  const result = await bikeServices.deleteSingleBikeFromDB(productId);
  sendResponse(res, {
    success: true,
    message: "Bike deleted successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });

})

export const bikeController = {
  createBike,
  getAllBike,
  getSingleBike,
  updateSingleBike,
  deleteSingleBike,
};

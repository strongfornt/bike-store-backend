import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../errors/custom.error";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { bikeServices } from "./bike.service";
import {
  bikeUpdateZodValidationSchema
} from "./bike.zod.validation";

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
const getAllBike = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let filter = {};
    // check if any query in request object
    if (searchTerm) {
      filter = {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { brand: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }

    const result = await bikeServices.getAllBikesFromDB(filter);

    // Check for empty results
    if (result.length === 0) {
      const message = searchTerm
        ? "No bikes match the search criteria. Please try refining your search."
        : "No bikes found in the database.";
      throw new CustomError(StatusCodes.BAD_REQUEST, message);
    }

    // response to the client

    res.status(200).json({
      message: "Bikes retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message:
        error instanceof CustomError
          ? error.message
          : "An unexpected error occurred",
      success: false,
      error,
      stack: error.stack || "No stack trace available",
    });
  }
};

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

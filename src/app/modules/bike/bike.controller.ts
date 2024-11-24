import { Request, Response } from "express";
import { bikeServices } from "./bike.service";
import {
  bikeUpdateZodValidationSchema,
  bikeZodValidationSchema,
} from "./bike.zod.validation";
import { Types } from "mongoose";
import { CustomError } from "../../config/custom.error";

// create bike =================================================================
const createBike = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    const zodParserData = bikeZodValidationSchema.parse(data);
    //will call services func to create bike data into db.
    const result = await bikeServices.createBikeIntoDB(zodParserData);
    //send response to the client
    res.status(200).json({
      message: "Bike created successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "validation failed",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// get bikes =================================================================
const getAllBike = async (req: Request, res: Response) => {
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

  // response to the client
  const result = await bikeServices.getAllBikesFromDB(filter);

   // Check for empty results
   if (result.length === 0) {
    const message = searchTerm
      ? "No bikes match the search criteria. Please try refining your search."
      : "No bikes found in the database.";
     res.status(404).json({
      message,
      status: false,
      data: [],
    });
  } else {
    // return result
    res.status(200).json({
      message: "Bikes retrieved successfully",
      status: true,
      data: result,
    });
  }
  // possible error is server error, so i don't need error handler here , cause i am using global error handler for this.
};

// get specific bike by id =================================
const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await bikeServices.getSingleBikesFromDB(productId);
    res.status(200).json({
      message: "Bike retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      message: "Bike not found with the given ID.",
      status: false,
      error,
      stack: error.stack || "No stack trace available",
    });
  }
};

// update bike by id ============================================================
const updateSingleBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    // parse tha data using zod validator =================================
    const zodParserData = bikeUpdateZodValidationSchema.parse(req.body.data);

    const { name, brand, price, category, description, quantity, inStock } =
      zodParserData;

    const updatedData = {
      $set: {
        name,
        brand,
        price,
        category,
        description,
        quantity,
        inStock,
        updatedAt: new Date().toISOString(),
      },
    };

    const result = await bikeServices.updateSingleBikeIntoDB(
      productId,
      updatedData
    );

    if (!result) { 
     throw new CustomError(`Bike not found with the given id ${productId}`,404) 
    }

    res.status(200).json({
      message: "Bike updated successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status( error.statusCode ||400).json({
      message: error instanceof CustomError ? error.message : "Validation failed",
      status: false,
      error,
      stack: error.stack,
    });
  }
};

export const bikeController = {
  createBike,
  getAllBike,
  getSingleBike,
  updateSingleBike,
};

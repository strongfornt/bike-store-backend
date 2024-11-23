import { Request, Response } from "express";
import { bikeServices } from "./bike.service";
import { bikeZodValidationSchema } from "./bike.zod.validation";

const createBike = async (req: Request, res: Response) => {
  try {
    const { bike } = req.body;

    const zodParserData = bikeZodValidationSchema.parse(bike);
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

// get bikes
const getAllBike = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  let filter = {};
  // check if any query in request object

  if(searchTerm){
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

  if (result.length === 0) {
   return res.status(200).json(
      {
        "message": "No bikes match the search criteria. Please try refining your search.",
        "success": true,
        "data": []
      }      
    )
  }
  // return result 
  res.status(200).json({
    message: "Bikes retrieved successfully",
    success: true,
    data: result,
  });

  // possible error is server error, so i don't need error handler here , cause i am using global error handler for this.
};

export const bikeController = {
  createBike,
  getAllBike,
};

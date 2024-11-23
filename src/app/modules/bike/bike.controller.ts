import { Request, Response } from "express";
import { bikeServices } from "./bike.service";

const createBike = async (req: Request, res: Response) => {
    try {
        const { bike } = req.body;
        //will call services func to create bike data into db.
        const result = await bikeServices.createBikeIntoDB(bike);
        //send response to the client
        res.status(200).json({
          message: "Bike created successfully",
          success: true,
          data: result,
        });
    } catch (error) {
        console.log(error);
        
    }
};


export const bikeController = {
    createBike,
}
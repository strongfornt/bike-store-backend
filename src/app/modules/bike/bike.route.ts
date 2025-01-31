import express from "express";
import { bikeController } from "./bike.controller";
import { validationMiddleWare } from "../../middleware/validateRequest";
import { BikeValidationZodSchema } from "./bike.zod.validation";
import { multerUpload } from "../../config/multer.config";
import { CustomError } from "../../errors/custom.error";
import { StatusCodes } from "http-status-codes";
import authMiddleware from "../../middleware/auth";

const router = express.Router();

// create bike and get all bikes route ==

router
  .route("/")
  .get(bikeController.getAllBike)
  .post(
    // authMiddleware('customer'),
    multerUpload.single("image"),
    (req, res, next) => {
      if(!req.file?.path){
        throw new CustomError(StatusCodes.BAD_REQUEST, "Image  is required to create a bike")
      } 
      req.body = JSON.parse(req.body?.data);
      next();
    },
    validationMiddleWare(BikeValidationZodSchema.bikeZodValidationSchema),
    bikeController.createBike
  );

// single element route ===
router
  .route("/:productId")
  .get(bikeController.getSingleBike)
  .patch(
    multerUpload.single("image"),
    (req, res, next) => {
      // if(!req.file?.path){
      //   throw new CustomError(StatusCodes.BAD_REQUEST, "Image  is required to create a bike")
      // } 
      req.body = JSON.parse(req.body?.data);
      next();
    },
    validationMiddleWare(BikeValidationZodSchema.bikeUpdateZodValidationSchema),
    bikeController.updateSingleBike
  )
  .delete(bikeController.deleteSingleBike);

export const BikeRoutes = router;

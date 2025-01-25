import express from "express";
import { bikeController } from "./bike.controller";
import { validationMiddleWare } from "../../middleware/validateRequest";
import { BikeValidationZodSchema } from "./bike.zod.validation";

const router = express.Router();

// create bike and get all bikes route ==

router
  .route("/")
  .get(bikeController.getAllBike)
  .post(
    validationMiddleWare(BikeValidationZodSchema.bikeZodValidationSchema),
    bikeController.createBike
  );

// single element route ==
router
  .route("/:productId")
  .get(bikeController.getSingleBike)
  .patch(
    validationMiddleWare(BikeValidationZodSchema.bikeUpdateZodValidationSchema),
    bikeController.updateSingleBike
  )
  .delete(bikeController.deleteSingleBike);

export const BikeRoutes = router;

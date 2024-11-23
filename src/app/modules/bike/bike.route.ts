import express from 'express';
import { bikeController } from './bike.controller';

const router = express.Router();

// create bike and get all bikes route ==

router.route('/')
        .get(bikeController.getAllBike)
        .post(bikeController.createBike)

// single element route ==
router.route('/:productId')
        .get(bikeController.getSingleBike)
        .put(bikeController.updateSingleBike)

export const BikeRoutes = router;        
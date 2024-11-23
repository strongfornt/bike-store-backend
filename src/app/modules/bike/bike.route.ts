import express from 'express';
import { bikeController } from './bike.controller';

const router = express.Router();

// create bike and get all bikes route ==

router.route('/')
        .get(bikeController.getAllBike)
        .post(bikeController.createBike)



export const BikeRoutes = router;        
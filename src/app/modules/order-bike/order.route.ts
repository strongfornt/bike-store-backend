import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();
// route for create order==
router.route("/")
        .post(orderController.createOrder);

// Revenue from Orders routes
router.route("/revenue")
        .get(orderController.calculateTotalRevenue);

export const OrderBikeRoutes = router;

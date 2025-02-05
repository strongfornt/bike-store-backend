import express from "express";
import authMiddleware from "../../middleware/auth";
import { validationMiddleWare } from "../../middleware/validateRequest";
import { User_Role } from "../user/user.constant";
import { orderController } from "./order.controller";
import { OrderValidationSchema } from "./order.zod.validation";

const router = express.Router();
// route for create order==
router
  .route("/")
  .post(
    authMiddleware(User_Role.admin, User_Role.customer),
    validationMiddleWare(OrderValidationSchema.orderZodValidationSchema),
    orderController.createOrder
  )
  .get(
    authMiddleware(User_Role.customer, User_Role.admin),
    orderController.getOrders
  )
  ;

router.patch(
  "/verify-order/:orderID",
  authMiddleware(User_Role.customer, User_Role.admin),
  orderController.verifyPayment
);


// Revenue from Orders routes
router.route("/revenue").get(orderController.calculateTotalRevenue);

export const OrderBikeRoutes = router;

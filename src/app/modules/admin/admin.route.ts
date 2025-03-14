import express from "express";
import { AdminController } from "./admin.controller";
import authMiddleware from "../../middleware/auth";
import { User_Role } from "../user/user.constant";
import { validationMiddleWare } from "../../middleware/validateRequest";
import { adminValidationSchema } from "./admin.zod.validation";

const router = express.Router();

router.get(
  "/get-all-users",
    authMiddleware(User_Role.admin),
  AdminController.getAllUser
);

router.patch('/update-user-status/:userId', 
    authMiddleware(User_Role.admin),
    validationMiddleWare(adminValidationSchema.userActiveZodValidationSchema),
    AdminController.updateUserStatus
)

router.patch('/update-order-status/:orderId',
  authMiddleware(User_Role.admin),
  validationMiddleWare(adminValidationSchema.updateOrderStatusValidationSchema),
  AdminController.updateOrderStatus
)
router.patch('/update-order-estimate-delivery-date/:orderId',
  authMiddleware(User_Role.admin),
  validationMiddleWare(adminValidationSchema.updateOrderEstimateDeliveryDateValidationSchema),
  AdminController.addEstimateDeliveryDateIntoOrder
)



export const AdminRoute = router
import express from 'express';
import { validationMiddleWare } from '../../middleware/validateRequest';
import { AuthValidationSchema } from './auth.zod.validation';
import { AuthController } from './auth.controller';
const router = express.Router()

router.post('/login',
    validationMiddleWare(AuthValidationSchema.loginValidationSchema),
    AuthController.loginUser
)
router.patch('/change-password',
    validationMiddleWare(AuthValidationSchema.changePassValidationSchema),
    AuthController.changePassword
)


export const AuthRoutes = router


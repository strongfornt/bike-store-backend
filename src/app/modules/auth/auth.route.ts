import express from 'express';
import { validationMiddleWare } from '../../middleware/validateRequest';
import { AuthValidationSchema } from './auth.zod.validation';
import { AuthController } from './auth.controller';
import { CustomError } from '../../errors/custom.error';
import { StatusCodes } from 'http-status-codes';
const router = express.Router()

router.post('/login',
    validationMiddleWare(AuthValidationSchema.loginValidationSchema),
    AuthController.loginUser
)
router.patch('/change-password',
    validationMiddleWare(AuthValidationSchema.changePassValidationSchema),
    AuthController.changePassword
)

router.post('/refresh-token',
    // validationMiddleWare(AuthValidationSchema.refreshTokenValidationSchema),
    (req, res,next) => {
        // console.log(req?.cookies?.refreshToken);
        if(!req?.cookies?.refreshToken){
            throw new CustomError(StatusCodes.UNAUTHORIZED,'Refresh token is missing or not provided')
        }
        next()
    },
    AuthController.refreshToken
)


export const AuthRoutes = router


import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { TErrorSource } from '../interface/error';
import handleZodError from '../errors/handle-zod.error';
import handleValidationError from '../errors/mongoose.validation.error';
import handleCastError from '../errors/cast.error';
import handleDuplicateError from '../errors/duplicate.error';
import CustomError from '../errors/Custom.error';


const globalErrorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
  //setting  default error
  let statusCode = 500;
  let message ='Something went wrong';

  let error: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simpleFydError = handleZodError(err);

    statusCode = simpleFydError?.statusCode;
    message = simpleFydError?.message;
    error = simpleFydError?.error;
    // console.log(simpleFydError);
  } else if (err?.name === 'ValidationError') {
    const simpleFydError = handleValidationError(err);

    statusCode = simpleFydError?.statusCode;
    message = simpleFydError?.message;
    error = simpleFydError?.error;
  } else if (err?.name === 'CastError') {
    const simpleFydError = handleCastError(err);

    statusCode = simpleFydError?.statusCode;
    message = simpleFydError?.message;
    error = simpleFydError?.error;
  } else if (err?.code === 11000) {
    const simpleFydError = handleDuplicateError(err);

    statusCode = simpleFydError?.statusCode;
    message = simpleFydError?.message;
    error = simpleFydError?.error;
  } else if (err instanceof CustomError) {
    statusCode = err?.statusCode;
    message = err?.message;
    error =[{
      path: '',
      message: err?.message, 
    }];
  }
  else if (err instanceof Error) {
    message = err?.message;
    error =[{
      path: '',
      message: err?.message, 
    }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
    // error: err,
  });
};

export default globalErrorHandler;

//pattern
/* 
  success
  message
  errorSources: [
    path:'',
    message: ''
  ]
  stack
 */

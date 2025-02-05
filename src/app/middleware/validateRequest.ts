import { AnyZodObject, ZodTypeAny  } from "zod";
import catchAsync from "../utils/catch-async";
import { NextFunction, Request, Response } from "express";

export const validationMiddleWare = (schema: AnyZodObject | ZodTypeAny) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const { data } = req.body;
    await schema.parseAsync(req?.body);
    next();
  });
};

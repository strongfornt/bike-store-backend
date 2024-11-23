import { NextFunction, Request, Response } from "express";


const unHandledError = (err: any, req: Request, res: Response, next: NextFunction) => {
     res.status(500).json({
        message: "Internal Server Error",
        success:false,
        error: err,
        stack:err.stack || "No stack trace available"
    })
}

const notFoundUrlError = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
      message:"Requested URL was not found",
      success:false,
      status:404,
      url: req.url
    })
  }

export const GlobalErrorFunc = {
    unHandledError,
    notFoundUrlError
};
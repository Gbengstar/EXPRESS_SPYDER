import { NextFunction, Request, Response } from 'express';
import { ErrorABC } from '../error/abstractError';

export const errorHandleMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err instanceof ErrorABC);
  if (err instanceof ErrorABC) {
    console.log(err.reason);
    return res
      .status(err.statusCode)
      .json({ status: 'fail', message: err.reason });
  }
};

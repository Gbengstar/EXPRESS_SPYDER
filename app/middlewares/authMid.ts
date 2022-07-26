import { NextFunction } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var token: string;

  console.log(req.headers);

  return next();
};

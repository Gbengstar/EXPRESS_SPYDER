import { Request, Response } from 'express';

export const userAuth = async (req: Request, res: Response) => {
  res.status(200).json({ status: 'success' });
};

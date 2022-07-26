import { Request, Response } from 'express';
import { RedisClient } from '../../helper/redis';

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('jwt');

  res.status(200).json({ status: 'success', message: 'logged out!' });
};

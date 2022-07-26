import { NextFunction, Request, Response } from 'express';
import { createUser, User, UserObject } from '../../model/userModel';
import { CustomError } from '../../error/genericError';
import { JWT } from '../../helper/jwt';
import { RedisClient } from '../../helper/redis';
declare global {
  namespace Express {
    interface Session {
      key: { name: string; phoneNumber: string; address: string };
    }
  }
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, phoneNumber, address, password } = req.body as createUser;
  if (!(name && password && address && password)) {
    throw new CustomError('All fields are required for registration', 400);
  }
  // check if phoneNumber length is correct
  if (phoneNumber.length !== 11)
    throw new CustomError('Phone Number must be 11 characters', 400);

  if (password.length < 5)
    throw new CustomError('Password must be 6 or more character ', 400);

  const exist = await User.finderOne({ phoneNumber });

  if (exist[0])
    throw new CustomError(`${phoneNumber} is already registered with us`, 400);

  try {
    const user = User.createUser({
      name,
      password,
      address,
      phoneNumber,
    });
    await user.save();

    const token = JWT.signJwt({ name, address, phoneNumber });
    // console.log('token >>', token);
    // await RedisClient.set('jwt', token!);

    res.cookie('jwt', token, { signed: true });
    res
      .status(201)
      .json({ status: 'success', message: 'user created successfuly', token });
  } catch (error) {
    throw new CustomError('Error occur while creating user', 500);
  }
};

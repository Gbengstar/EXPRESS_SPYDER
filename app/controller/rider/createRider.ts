import { RiderDoc } from './../../model/ridersModel';
import { NextFunction, Request, Response } from 'express';
import { createUser, User, UserObject } from '../../model/userModel';
import { CustomError } from '../../error/genericError';
import { JWT } from '../../helper/jwt';
import { RedisClient } from '../../helper/redis';
import { validateRidersDetails } from '../../helper/validateRiderDetails';
import { Rider } from '../../model/ridersModel';

export const signUpRider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { details } = req.body;
  if (!validateRidersDetails(req)) {
    throw new CustomError('All fields are required for registration', 400);
  }
  // check if phoneNumber length is correct
  if (req.body.phoneNumber.length !== 11)
    throw new CustomError('Phone Number must be 11 characters', 400);

  if (req.body.password.length < 5)
    throw new CustomError('Password must be 6 or more character ', 400);

  const exist = await Rider.findOne({
    phoneNumber: req.body?.phoneNumber,
  });

  if (exist)
    throw new CustomError(
      `${req.body.phoneNumber} is already registered with us`,
      400
    );

  try {
    const rider = Rider.createRider({
      ...req.body,
    });
    await rider.save();

    const token = JWT.signJwt({
      name: rider.name,
      address: rider.address,
      phoneNumber: rider.phoneNumber,
    });
    // console.log('token >>', token);
    // await RedisClient.set('jwt', token!);

    res.cookie('jwt', token, { signed: true });
    res
      .status(201)
      .json({ status: 'success', message: 'Rider created successfuly', token });
  } catch (error) {
    throw new CustomError('Error occur while creating user', 500);
  }
};

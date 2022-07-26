import { Request, Response } from 'express';
import { CustomError } from '../../error/genericError';
import { JWT } from '../../helper/jwt';
import { Password } from '../../helper/password';
import { RedisClient } from '../../helper/redis';
import { User } from '../../model/userModel';

interface Body {
  phoneNumber: string;
  password: string;
}

export const loginController = async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body as Body;

  if (!(phoneNumber && password))
    throw new CustomError('Phone Number and Password is required', 400);
  try {
    // find user in the database
    const user = await User.findOne({ phoneNumber });

    //check if user exist, send error if user do not exist
    if (!user) throw new CustomError('invalid phone Number or password', 400);
    //compare password with encrypted saved password
    const check = await Password.comparePassword(user?.password!, password);
    // throw an error if the password is not the same with stored password
    if (!check) throw new CustomError('Wrong phone number or password', 400);
    // create token for the user
    const token = JWT.signJwt({
      name: user?.name,
      phoneNumber: user?.phoneNumber,
      address: user?.phoneNumber,
    });
    res.cookie('jwt', token, { signed: true });
    // console.log('token >>', token);
    // await RedisClient.set('jwt', token!);

    res
      .status(200)
      .json({ status: 'success', message: `${phoneNumber} logged in!`, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'fail', message: 'Error occur while logging in!' });
  }
};

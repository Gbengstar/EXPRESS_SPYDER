import { promisify } from 'util';
import { UserObject } from '../model/userModel';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response, Express } from 'express';
import { CustomError } from '../error/genericError';
interface Payload {
  name: string;
  phoneNumber: string;
  address: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
      cookie?: { jwt: string };
      authorization?: string;
    }
  }
}

export class JWT {
  static signJwt(info: UserObject) {
    console.log(process.env.SECRET);
    if (process.env.SECRET)
      return jwt.sign(info, process.env.SECRET, { expiresIn: '1h' });
  }

  static authenticate(req: Request, res: Response, next: NextFunction) {
    var token: string = '';

    // check if there is session attached to the
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token && req.signedCookies) {
      token = req.signedCookies.jwt;
    }

    if (!token) throw new CustomError('invalid credentials', 400);
    try {
      const user = jwt.verify(token, process.env.SECRET!) as Payload;

      req.user = user;
      console.log(user);
      next();
    } catch (error) {
      throw new CustomError('invalid Token!', 400);
    }
  }
}

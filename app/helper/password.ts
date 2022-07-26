import { randomBytes, scrypt } from 'crypto';
import { Request } from 'express';
import { promisify } from 'util';
import { CustomError } from '../error/genericError';

const asyncScript = promisify(scrypt);
export class Password {
  constructor() {}

  static async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hashedPass = (await asyncScript(password, salt, 64)) as Buffer;
    return `${hashedPass.toString('hex')}.${salt}`;
  }

  static async comparePassword(storedPassword: string, userPassword: string) {
    const [storedHashPass, salt] = storedPassword.split('.');
    const hashedPass = (await asyncScript(userPassword, salt, 64)) as Buffer;

    return hashedPass.toString('hex') === storedHashPass;
  }
}

import { ErrorABC } from './abstractError';

export class CustomError extends ErrorABC {
  constructor(public reason: string, public statusCode: number) {
    super();

    Object.setPrototypeOf(this, ErrorABC.prototype);
  }
}

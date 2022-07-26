import { ErrorABC } from './abstractError';

export class NotFoundError extends ErrorABC {
  constructor(public reason: string, public statusCode: number) {
    super();

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

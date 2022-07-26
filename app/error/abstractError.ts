export abstract class ErrorABC extends Error {
  public abstract reason: string;
  public abstract statusCode: number;
  constructor() {
    super();

    Object.setPrototypeOf(this, ErrorABC.prototype);
  }
}

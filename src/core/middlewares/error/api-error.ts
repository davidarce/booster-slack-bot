/**
 * Application error that specifies the extra properties
 * `httpStatus` and `isOperational`.
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public readonly httpStatus: number,
    public readonly isOperational: boolean,
    public readonly stack?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

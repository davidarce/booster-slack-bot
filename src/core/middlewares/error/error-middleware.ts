import { Request, Response, NextFunction } from 'express';
import * as httpStatus from 'http-status';
import { AppError } from './api-error';

/**
 * Express error handler middleware.
 * There should be only one error handler middleware per application
 * and it should be added as the last middleware.
 */
export function errorHandlerMiddleware() {
  return (err: any, _req: Request, res: Response, _next: NextFunction) => {
    let error = err;
    let status = err.httpStatus || httpStatus.INTERNAL_SERVER_ERROR;
    // Check for axios error since it swallows the real error code
    // of the request
    if (err.response) {
      err.message = `${err.message} ${err.response.data.message}`;
      status = err.response.status;
      err.code = err.response.data.code;
    } else if (err.errors) {
      // validation error contains errors which is an array of error each containing message[]
      const unifiedErrorMessage = err.errors
        .map(error =>
            `property ${error.property} has invalid value - validation errors: ${JSON.stringify(error.constraints)}`
        )
        .join(' and ');
      error = new AppError(unifiedErrorMessage, status, true);
    }
    res.status(status).json({ ...error, message: error.message });
  };
}

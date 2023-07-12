import { NextFunction, Request, Response } from 'express';
import CustomError from '../exception/custom-error';
import { StatusCodes } from 'http-status-codes';

function notFoundMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  return next(
    new CustomError(
      StatusCodes.NOT_FOUND,
      `${request.originalUrl} does not exist`,
    ),
  );
}

export default notFoundMiddleware;

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../exception/http-exception';
import logger from '../utils/logger';
import { ENVIRONMENT } from '../config/secrets';
import ResponseHandler from '../utils/response-handler';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const status = error.status || 500;
  const message = error.message.toString() || 'Something went wrong';
  const err = error.error || null;
  if (ENVIRONMENT !== 'test') {
    logger.error(
      `BODY- ${JSON.stringify(
        request.body,
      )}, STATUS - ${status}, MESSAGE - ${message}, URL - ${
        request.originalUrl
      }, METHOD - ${request.method}, IP - ${request.ip}`,
    );
  }

  if (status === StatusCodes.BAD_REQUEST) {
    return ResponseHandler.BadRequestResponse(response, message, err);
  }
  return ResponseHandler.ServerErrorResponse(response, status, message, err);
}

export default errorMiddleware;

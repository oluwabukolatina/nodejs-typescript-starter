import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../exception/custom-error';
import logger from '../lib/logger';
import ResponseHandler from '../lib/response-handler';
import { UnknownInterface } from '../lib/unknown.interface';

function logError(
  request: Request,
  body: UnknownInterface,
  message: string,
  status: number,
) {
  logger.error(
    `BODY- ${JSON.stringify(
      request.body,
    )}, STATUS - ${status}, MESSAGE - ${message}, URL - ${
      request.originalUrl
    }, METHOD - ${request.method}, IP - ${request.ip}`,
  );
}
function errorMiddleware(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const err = error.error || null;

  const hasErrorMessage = error && error.message;
  const message = hasErrorMessage
    ? hasErrorMessage.toString()
    : 'Something went wrong';
  const status = error.status || 500;
  const body = `${JSON.stringify(request.body)}`;
  logError(request, body, message, status);
  if (status === StatusCodes.BAD_REQUEST) {
    return ResponseHandler.BadRequestResponse(response, message, err);
  }
  if (status === StatusCodes.NOT_FOUND) {
    return ResponseHandler.NotFoundResponse(response, message);
  }
  if (status === StatusCodes.UNAUTHORIZED) {
    return ResponseHandler.UnAuthorizedRequestResponse(response, message);
  }
  if (status === StatusCodes.INTERNAL_SERVER_ERROR) {
    return ResponseHandler.ServerErrorResponse(response, status, message, err);
  }
  if (err === null) {
    return ResponseHandler.ServerErrorResponse(
      response,
      status,
      'unable to complete request',
      err,
    );
  }
  return ResponseHandler.ServerErrorResponse(
    response,
    status,
    'unable to complete request',
    err,
  );
}

export default errorMiddleware;

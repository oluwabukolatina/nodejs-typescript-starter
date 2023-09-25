import { Request } from 'express';
import logger from '../lib/logger';
import CustomError from '../exception/custom-error';

function loggerMiddleware(error: CustomError, request: Request) {
  const status = error.status || 500;
  logger.info(
    `status - ${status}, url - ${request.originalUrl}, method - ${
      request.method
    },IP - ${request.ip}, body- ${JSON.stringify(request.body)}`,
  );
}

export default loggerMiddleware;

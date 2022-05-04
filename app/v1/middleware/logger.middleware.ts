import { Request } from 'express';
import HttpException from '../exception/http-exception';
import logger from '../utils/logger';

function loggerMiddleware(error: HttpException, request: Request) {
  const status = error.status || 500;
  logger.info(
    `status - ${status}, url - ${request.originalUrl}, method - ${
      request.method
    },IP - ${request.ip}, body- ${JSON.stringify(request.body)}`,
  );
}

export default loggerMiddleware;

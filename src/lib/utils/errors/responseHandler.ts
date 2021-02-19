import { Response } from 'express';

export default class ResponseHandler {
  static ErrorResponse(
    res: Response,
    statusCode: number,
    status: boolean,
    message = '',
  ) {
    return res.status(statusCode).json({ message, status });
  }
}

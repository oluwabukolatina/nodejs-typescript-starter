import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Helper from './helper';
import { UnknownInterface } from './unknown.interface';

class ResponseHandler {
  static ErrorResponse(
    res: Response,
    code: number,
    message: string,
    data: UnknownInterface,
  ) {
    return res.status(code).json({ message, status: false, data });
  }

  static JoiErrorResponse(
    response: Response,
    code: number,
    data: UnknownInterface,
    message: string,
  ) {
    return response.status(code).json({ status: false, message, data });
  }

  static SuccessResponse(
    response: Response,
    code: number,
    message = '',
    data?: UnknownInterface,
  ) {
    return response.status(code).json({ message, status: true, data });
  }

  static CreatedResponse(
    response: Response,
    message = '',
    data: UnknownInterface,
  ) {
    return response
      .status(StatusCodes.CREATED)
      .json({ message, status: true, data });
  }

  static ServerErrorResponse(
    response: Response,
    code?: number | UnknownInterface,
    message?: string,
    error?: UnknownInterface,
    data?: UnknownInterface,
  ) {
    if (error) {
      return response.status(code).json({
        message: Helper.upperCase(`server message: -${message}`),
        status: false,
        data,
        error,
      });
    }
    return response.status(code).json({
      message: Helper.upperCase(`server message: -${message}`),
      status: false,
      data,
    });
  }

  static BadRequestResponse(
    response: Response,
    message: string,
    data?: UnknownInterface,
  ) {
    if (data) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: Helper.upperCase(message),
        status: false,
        data,
      });
    }
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: Helper.upperCase(message),
      status: false,
    });
  }

  static NotFoundResponse(response: Response, message: string) {
    return response
      .status(StatusCodes.NOT_FOUND)
      .json({ message, status: false });
  }

  static UnAuthorizedRequestResponse(
    response: Response,
    message: string,
    data?: UnknownInterface,
  ) {
    if (data) {
      return response.status(StatusCodes.UNAUTHORIZED).json({
        message: Helper.upperCase(message),
        status: false,
        data,
      });
    }
    return response.status(StatusCodes.UNAUTHORIZED).json({
      message: Helper.upperCase(message),
      status: false,
    });
  }
}

export default ResponseHandler;

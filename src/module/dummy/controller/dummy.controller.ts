import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../../../utils/http-exception';
import ResponseHandler from '../../../utils/response-handler';
import DummyService from '../service/dummy.service';

class DummyController {
  public createDummy = async (
    { body }: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dummy = await DummyService.create(body);
      if (!dummy) {
        return next(new HttpException(StatusCodes.BAD_REQUEST, 'Not created'));
      }
      return ResponseHandler.CreatedResponse(res, 'Created', dummy);
    } catch (error) {
      return next(error);
    }
  };
}
export default DummyController;

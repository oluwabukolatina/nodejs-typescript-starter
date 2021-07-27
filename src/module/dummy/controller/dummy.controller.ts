import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as response from '../../../utils/responseHandler';
import DummyRepository from '../service/dummy.service';

class DummyController {
  public createDummy = async ({ body }: Request, res: Response) => {
    try {
      const dummy = await DummyRepository.create(body);
      if (!dummy) {
        return response.errorResponse(res, 400, false, 'try again');
      }
      return response.successResponse(
        res,
        HttpStatus.CREATED,
        true,
        'Created',
        dummy,
      );
    } catch (error) {
      return response.errorResponse(res, 400, false, 'try again');
    }
  };
}
export default DummyController;

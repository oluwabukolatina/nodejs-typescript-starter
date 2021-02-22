import { Request, Response } from 'express';
import ResponseHandler from '../../../../utils/errors/ResponseHandler';
import DummyRepository from '../repository/dummy.repository';

class DummyController {
  public createDummy = async ({ body }: Request, res: Response) => {
    const dummy = await DummyRepository.create(body);
    if (!dummy) ResponseHandler.ErrorResponse(res, 400, false, 'try again');
  };
}
export default DummyController;

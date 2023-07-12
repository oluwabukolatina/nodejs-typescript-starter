import { Request, Response } from 'express';
import DummyRepository from './repository/dummy.repository';
import { ClientError } from '../../exception/client.error';
import ResponseHandler from '../../lib/response-handler';

class DummyController {
  public createDummy = async (request: Request, res: Response) => {
    const dummy = await DummyRepository.create(request.body);
    if (!dummy) {
      throw new ClientError('Not created');
    }
    return ResponseHandler.CreatedResponse(res, 'Created', dummy);
  };
}
export default DummyController;

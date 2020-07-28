import { Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DummyService from './dummy.service';

class DummyController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async createDummy(req: Request, res: Response) {
    // eslint-disable-next-line no-console
    console.log('hello');
  }
}
export default DummyController;

import { Application } from 'express';
import DummyController from './dummy.controller';
import { CREATE_DUMMY_URL } from './dummy.url';
import DummyValidation from './dummy.validation';
import { asyncHandler } from '../../middleware/async-handler';

class DummyRoute {
  public dummyController: DummyController = new DummyController();

  public routes = (app: Application): void => {
    app
      .route(CREATE_DUMMY_URL)
      .post(
        DummyValidation.validateCreateDummy,
        asyncHandler(this.dummyController.createDummy),
      );
  };
}
export default DummyRoute;

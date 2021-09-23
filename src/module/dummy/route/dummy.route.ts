import { Application } from 'express';
import DummyController from '../controller/dummy.controller';
import { CREATE_DUMMY_URL } from '../url/dummy.url';
import DummyValidation from '../validation/dummy.validation';

class DummyRoute {
  public dummyController: DummyController = new DummyController();

  public routes = (app: Application): void => {
    app
      .route(CREATE_DUMMY_URL)
      .post(
        DummyValidation.validateCreateDummy,
        this.dummyController.createDummy,
      );
  };
}
export default DummyRoute;

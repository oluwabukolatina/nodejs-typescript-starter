import { Application } from 'express';
import DummyController from '../controller/dummy.controller';

class DummyRoutes {
  public dummyController: DummyController = new DummyController();

  public routes = (app: Application): void => {
    app.route('/api/v1/starter/dummy').post(this.dummyController.createDummy);
  };
}
export default DummyRoutes;

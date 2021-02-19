import DummyController from '../controller/dummy.controller';

class DummyRoutes {
  public dummyController: DummyController = new DummyController();

  public routes = (app: any): void => {
    const DUMMY_URL = '/api/v1/awabah/dummy';
    app.route(`${DUMMY_URL}`).post(this.dummyController.createDummy);
  };
}
export default DummyRoutes;

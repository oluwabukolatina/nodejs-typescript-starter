import DummyController from '../controller/dummy.controller';

class DummyRoutes {
  public dummyController: DummyController = new DummyController();

  public routes = (app: any): void => {
    app.route(`/api/v1/starter/dummy`).get(this.dummyController.createDummy);
  };
}
export default DummyRoutes;

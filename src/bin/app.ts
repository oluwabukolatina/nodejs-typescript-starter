import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import swaggerDocument from '../../swagger.json';
import DummyRoutes from '../module/dummy/route/dummy.route';
import notFoundMiddleware from '../middleware/not-found.middleware';
import errorMiddleware from '../middleware/error.middleware';
import welcomeMessage from '../middleware/welcome.middleware';

dotenv.config();

class App {
  public app: express.Application;

  public dummyRoutes: DummyRoutes = new DummyRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.dummyRoutes.routes(this.app);
    this.app.disable('x-powered-by');
    this.app.get('/', welcomeMessage);
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
  }

  private config = (): void => {
    this.app.use(helmet());
    this.app.use(mongoSanitize());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  };
}

export default new App().app;
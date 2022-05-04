import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import morganBody from 'morgan-body';
import swaggerDocument from '../swagger.json';
import notFoundMiddleware from './v1/middleware/not-found.middleware';
import errorMiddleware from './v1/middleware/error.middleware';
import welcomeMessage from './v1/middleware/welcome.middleware';
import DummyRoute from './v1/component/dummy/route/dummy.route';
import AuthRoute from './v1/component/auth/route/auth.route';
import { ENVIRONMENT } from './v1/config/secrets';
import { AUTH_URL } from './v1/utils/url/url';
import rateLimiter from './v1/middleware/rate-limiter';

dotenv.config();

class App {
  public app: express.Application;

  public dummyRoute: DummyRoute = new DummyRoute();

  public authRoute: AuthRoute = new AuthRoute();

  constructor() {
    this.app = express();
    this.config();
    this.dummyRoute.routes(this.app);
    this.authRoute.routes(this.app);
    this.app.disable('x-powered-by');
    this.app.set('trust proxy', true);
    this.app.get('/', welcomeMessage);
    this.app.get('*', notFoundMiddleware);
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
    morganBody(this.app, {
      logAllReqHeader: false,
      maxBodyLength: 5000,
      logResponseBody: false,
    });
    if (ENVIRONMENT === 'production') {
      this.app.use(`${AUTH_URL}`, rateLimiter);
    }
  };
}

export default new App().app;

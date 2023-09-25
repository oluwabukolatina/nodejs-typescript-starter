import * as dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import DummyRoute from './component/dummy/dummy.route';
import AuthRoute from './component/auth/auth.route';
import welcomeMessage from './middleware/welcome.middleware';
import notFoundMiddleware from './middleware/not-found.middleware';
import errorMiddleware from './middleware/error.middleware';
import { ENVIRONMENT } from './config/secrets';
import { AUTH_URL } from './lib/url/url';
import rateLimiter from './middleware/rate-limiter';
import swaggerDocument from '../swagger.json';

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

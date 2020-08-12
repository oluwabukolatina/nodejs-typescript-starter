import morgan from 'morgan';
/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../swagger.json';

/**
 * routes
 */
import DummyRoute from './v1/dummy/dummy.route';

dotenv.config();

/**
 * App Variables
 */
const app = express();

/**
 *  App Configuration
 */
app.use(express.json());
app.use(morgan('dev'));

/**
 * Server Activation
 */

app.get('/', (req, res) => res.send('Hello! Node/Typescript starter!'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const BASE_URL = `/api/v1/dummy`;
app.use(`${BASE_URL}`, DummyRoute);
export default app;

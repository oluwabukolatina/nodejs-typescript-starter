import morgan from 'morgan';
/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express';
/**
 * routes
 */
import DummyRoute from './v1/dummy/dummy.route';

dotenv.config();

/**
 * App Variables
 */
const app = express();

// const PORT: number = parseInt(process.env.APP_PORT as string, 10) || 3000;

/**
 *  App Configuration
 */
app.use(express.json());
app.use(morgan('dev'));

/**
 * Server Activation
 */

app.get('/', (req, res) => res.send('Hello! Node/Typescript starter!'));
app.use('/api/v1/dummy', DummyRoute);
export default app;
// eslint-disable-next-line import/prefer-default-export
// export { app }

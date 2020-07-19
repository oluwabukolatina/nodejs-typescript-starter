import { connect } from 'mongoose';
import morgan from 'morgan';
/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

// const PORT: number = parseInt(process.env.APP_PORT as string, 10) || 3000;
const PORT: string|number = process.env.PORT || 3000;
const DB = String(process.env.APP_DB);
const app = express();

/**
 *  App Configuration
 */
app.use(express.json());
app.use(morgan('dev'));

/**
 * Server Activation
 */

// eslint-disable-next-line no-console
app.get('/', (req, res) => res.send('Hello Node/Typescript starter!'));
// eslint-disable-next-line consistent-return
app.listen(PORT, () => {
  try {
    connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // eslint-disable-next-line no-console
    }).then(() => { console.log('connected'); })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => { });
  } catch (error) {
    return error;
  }
});

import { connect, disconnect } from 'mongoose';
import { ENVIRONMENT } from '../config/secrets';

const env = require('../config/env')[String(ENVIRONMENT)];

async function connectToDb() {
  return connect(env.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}
async function disconnectFromDB() {
  return disconnect();
}
export default { connectToDb, disconnectFromDB };

import { connect, disconnect } from 'mongoose';
import { ENVIRONMENT } from '../config/secrets';

const env = require('../config/env')[String(ENVIRONMENT)];

export const connectToDatabase = async () => {
  return connect(env.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

async function disconnectFromDB() {
  return disconnect();
}
export default { connectToDatabase, disconnectFromDB };

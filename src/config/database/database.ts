import { connect, disconnect } from 'mongoose';
import * as dotenv from 'dotenv';
import { APP_DB, ENVIRONMENT } from '../secrets';

dotenv.config();
async function connectToDb() {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    return await connect(
      ENVIRONMENT === 'development' ? String(process.env.LOCAL_DB) : APP_DB,
      options,
    );
  } catch (error) {
    return error;
  }
}
async function disconnectFromDB() {
  return disconnect();
}
export default { connectToDb, disconnectFromDB };

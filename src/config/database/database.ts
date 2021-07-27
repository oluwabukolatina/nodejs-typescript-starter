import { connect, disconnect } from 'mongoose';
import { ENVIRONMENT } from '../secrets';

const config = require('../config')[ENVIRONMENT];

async function connectToDb() {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    return await connect(config.database, options);
  } catch (error) {
    return error;
  }
}
async function disconnectFromDB() {
  return disconnect();
}
export default { connectToDb, disconnectFromDB };

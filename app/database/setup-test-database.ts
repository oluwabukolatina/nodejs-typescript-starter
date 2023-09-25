import { connectToDatabase } from './database';
import logger from '../lib/logger';

const setupTestDatabase = () => {
  beforeAll(async (done) => {
    await connectToDatabase()
      .then(async (res) => {
        await res.connection.db.dropDatabase();
        done();
      })
      .catch((err) => {
        logger.info(err);
        done();
      });
  });
};

export default setupTestDatabase;

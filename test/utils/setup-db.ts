import { connection } from 'mongoose';
import testDb from '../../src/config/database/test-database';

const setupTestDB = () => {
  beforeAll((done) => {
    testDb
      .connectToDb()
      .then(() => {
        done();
      })
      .catch(() => done());
  });
  afterAll(async () => {
    await connection.close();
  });
};

export default setupTestDB;

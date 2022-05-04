import { connection } from 'mongoose';
import database from './database';

const setupTestDatabase = () => {
  beforeAll((done) => {
    database
      .connectToDb()
      .then(() => {
        done();
      })
      .catch(() => done());
  });
  beforeAll(async () => {
    const { collections } = connection;
    Object.keys(collections).forEach((e) => {
      const collection = collections[e];
      collection.deleteMany({});
    });
  });
  afterAll(async () => {
    const { collections } = connection;
    Object.keys(collections).forEach((e) => {
      const collection = collections[e];
      collection.deleteMany({});
    });
  });
  afterAll(async () => {
    await connection.close();
  });
};

export default setupTestDatabase;

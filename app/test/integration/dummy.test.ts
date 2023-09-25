import setupTestDatabase from '../../database/setup-test-database';
import request from 'supertest';
import { CREATE_DUMMY_URL } from '../../component/dummy/dummy.url';
import MockData from '../../lib/mock-data';
import { StatusCodes } from 'http-status-codes';
import app from '../../app';

setupTestDatabase();
describe('dummy', () => {
  it('creates a dummy and returns the appropriate response', async () => {
    const result = await request(app)
      .post(CREATE_DUMMY_URL)
      .send(MockData.createNewDummy());
    expect(result.status).toEqual(StatusCodes.CREATED);
    expect(result.body.message).toEqual('Created');
    expect(result.body.status).toEqual(true);
    expect(result.body).toHaveProperty('data');
  });
});

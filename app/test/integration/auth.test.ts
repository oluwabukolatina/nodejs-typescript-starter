import setupTestDatabase from '../../database/setup-test-database';
import TestUtils from '../../lib/mock-data';
import request from 'supertest';
import * as authUrl from '../../component/auth/auth.url';
import { StatusCodes } from 'http-status-codes';
import app from '../../app';

setupTestDatabase();
describe('Auth', () => {
  const newUserData = TestUtils.createNewUser();
  const verifiedUserData = TestUtils.createNewUser();
  let userEmail = '';
  let userPassword = '';
  let verifiedUserEmail = '';
  let verifiedUserPassword = '';
  /**
   * new user
   */
  beforeAll(async () => {
    request(app)
      .post(`${authUrl.REGISTER_URL}`)
      .send(newUserData)
      .end((err, { body }) => {
        userEmail = body.data.email;
        userPassword = newUserData.password;
      });
  });
  /**
   * create verified user
   */
  beforeAll((done) => {
    request(app)
      .post(`${authUrl.REGISTER_URL}`)
      .send(verifiedUserData)
      .end((err, result) => {
        verifiedUserEmail = result.body.data.email;
        verifiedUserPassword = verifiedUserData.password;
        done();
      });
  });

  describe('/auth', () => {
    it('/login should NOT login a user that does not exist', (done) => {
      const randomUser = TestUtils.createNewUser();
      request(app)
        .post(`${authUrl.LOGIN_URL}`)
        .send(randomUser)
        .end((err, res) => {
          expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
          expect(res.body.status).toEqual(false);
          done();
        });
    });
    it('should login a user and return token', (done) => {
      request(app)
        .post(`${authUrl.LOGIN_URL}`)
        .send({ email: verifiedUserEmail, password: verifiedUserPassword })
        .end((err, res) => {
          expect(res.body.message).toEqual('Log in successful');
          expect(res.body.status).toEqual(true);
          expect(res.body.data).toHaveProperty('token');
          done();
        });
    });
    it('should create a user', async () => {
      const user = TestUtils.createNewUser();
      const res = await request(app).post(`${authUrl.REGISTER_URL}`).send(user);
      expect(res.status).toEqual(StatusCodes.CREATED);
      expect(res.body.message).toEqual('User Created');
      expect(res.body.status).toEqual(true);
      expect(res.body).toHaveProperty('data');
    });
    it('should not create a user that already exists', async () => {
      const result = await request(app).post(`${authUrl.REGISTER_URL}`).send({
        email: userEmail,
        password: userPassword,
      });
      expect(result.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(result.body.status).toEqual(false);
    });
  });
});

import Model from '../user.model';
import TestUtils from '../../../../utils/mock-data';
import setupTestDatabase from '../../../../database/setup-test-database';

setupTestDatabase();
describe('user model test', () => {
  const user = TestUtils.createNewUser();
  let userEmail = '';
  beforeAll(async () => {
    const createdUser = await Model.create(user);
    userEmail = createdUser.email;
  });

  it('has a module', () => {
    expect(Model).toBeDefined();
  });
  it('gets a user', async () => {
    const findUser = await Model.findOne({
      email: userEmail,
    });
    expect(user.email).toEqual(findUser?.email);
  });
});

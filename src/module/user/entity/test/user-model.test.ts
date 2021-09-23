import Model from '../user.model';
import setupTestDB from '../../../../utils/setup-db';
import TestUtils from '../../../../utils/constants';

setupTestDB();
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
  it('creates a user', async () => {
    const newUser = await TestUtils.createNewUserModel();
    const createdUser = await Model.create(newUser);
    expect(newUser.email).toEqual(createdUser?.email);
  });
});

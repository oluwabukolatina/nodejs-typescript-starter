import faker from 'faker';
import AuthHelper from '../module/auth/helper/auth-helper';

const TestUtils = {
  createNewDummy() {
    return {
      name: faker.lorem.words(10),
    };
  },
  createNewUser() {
    return {
      email: faker.internet.email(),
      password: `1A${faker.internet.password()}!`,
    };
  },
  async createNewUserModel() {
    const password = await AuthHelper.hashPassword(
      `1A${faker.internet.password()}!`,
    );
    return {
      email: faker.internet.email(),
      password,
    };
  },
};
export default TestUtils;

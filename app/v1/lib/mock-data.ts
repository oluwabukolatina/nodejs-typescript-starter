import faker from 'faker';

const MockData = {
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
};
export default MockData;

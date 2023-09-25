import bcrypt from 'bcrypt';

const Bcrypt = {
  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  },
  async comparePassword(password: string, hashed: string) {
    return bcrypt.compare(password, hashed);
  },
};
export default Bcrypt;

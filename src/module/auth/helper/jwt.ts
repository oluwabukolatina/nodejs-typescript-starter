import jwt from 'jsonwebtoken';
import { IUser } from '../../user/interface/user.interface';
import * as secret from '../../../config/secrets';

const Jwt = {
  createToken(id: IUser['_id'], email: IUser['email']) {
    return jwt.sign({ id, email }, secret.STARTER_JWT_SECRET, {
      expiresIn: secret.STARTER_JWT_EXPIRY,
    });
  },
};

export default Jwt;

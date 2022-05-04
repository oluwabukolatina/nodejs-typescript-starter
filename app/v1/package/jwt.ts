import jwt from 'jsonwebtoken';

const Jwt = {
  createToken(payload: any, secret: jwt.Secret, expiry: string) {
    return jwt.sign(payload, secret, {
      expiresIn: expiry,
    });
  },
  verifyToken(token: string, key: string) {
    return jwt.verify(token, key, (err, decoded) => {
      if (err) return err;
      return decoded;
    });
  },
};

export default Jwt;

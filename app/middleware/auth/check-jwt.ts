import { NextFunction, Request, Response } from 'express';
import { UnAuthorizedError } from '../../exception/un-authorized.error';
import Jwt from '../../lib/package/jwt';
import { JWT_SECRET } from '../../config/secrets';
import { ClientError } from '../../exception/client.error';

async function checkJwt(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  if (!token)
    return next(new UnAuthorizedError('Authorization Denied. No Token Found'));

  try {
    req.user = Jwt.verifyToken(token, JWT_SECRET);
    return next();
  } catch (e) {
    return next(new ClientError('Token Is Not Valid'));
  }
}
export default checkJwt;

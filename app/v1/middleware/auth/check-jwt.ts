import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../../exception/http-exception';
import Jwt from '../../package/jwt';
import { JWT_SECRET } from '../../config/secrets';

async function checkJwt(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  if (!token)
    return next(
      new HttpException(
        StatusCodes.UNAUTHORIZED,
        'Authorization Denied. No Token Found',
      ),
    );

  try {
    req.user = Jwt.verifyToken(token, JWT_SECRET);
    return next();
  } catch (e) {
    return next(
      new HttpException(StatusCodes.BAD_REQUEST, 'Token Is Not Valid'),
    );
  }
}
export default checkJwt;

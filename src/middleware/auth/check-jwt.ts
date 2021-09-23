import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import HttpException from '../../utils/http-exception';
import { STARTER_JWT_SECRET } from '../../config/secrets';

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
    req.user = jwt.verify(token, STARTER_JWT_SECRET);
    return next();
  } catch (e) {
    return next(
      new HttpException(StatusCodes.BAD_REQUEST, 'Token Is Not Valid'),
    );
  }
}
export default checkJwt;

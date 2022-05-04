import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ResponseHandler from '../../../utils/response-handler';
import Bcrypt from '../../../package/bcrypt';
import Email from '../../../utils/email/email';
import AuthEmailHelper from '../helper/auth-email.helper';
import UserService from '../../user/service/user.service';
import HttpException from '../../../exception/http-exception';
import { JWT_EXPIRY, JWT_SECRET } from '../../../config/secrets';
import Jwt from '../../../package/jwt';

class AuthController {
  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email } = req.body;
    try {
      const existingUser = await UserService.findUser({ email });
      const token = Jwt.createToken(
        { id: existingUser._id, email: existingUser.email },
        JWT_SECRET,
        JWT_EXPIRY,
      );
      if (!token) {
        return next(
          new HttpException(StatusCodes.BAD_REQUEST, 'Unable to create token'),
        );
      }
      return ResponseHandler.SuccessResponse(
        res,
        StatusCodes.OK,
        'Log in successful',
        {
          email: existingUser.email,
          id: existingUser._id,
          token,
        },
      );
    } catch (err) {
      return next(err);
    }
  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const newUser = await UserService.createUser({
        email,
        password: await Bcrypt.hashPassword(password),
      });
      if (!newUser._id)
        return next(
          new HttpException(StatusCodes.BAD_REQUEST, 'Unable to save user'),
        );
      const token = Jwt.createToken(
        { id: newUser._id, email },
        JWT_SECRET,
        JWT_EXPIRY,
      );
      await Email.sendEmail(AuthEmailHelper.createWelcomeEmail(email));
      return ResponseHandler.SuccessResponse(
        res,
        StatusCodes.CREATED,
        'User Created',
        {
          email,
          token,
        },
      );
    } catch (err) {
      return next(err);
    }
  };
}
export default AuthController;

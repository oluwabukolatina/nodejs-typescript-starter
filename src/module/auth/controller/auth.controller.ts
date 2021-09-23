import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../../user/service/user.service';
import Jwt from '../helper/jwt';
import HttpException from '../../../utils/http-exception';
import ResponseHandler from '../../../utils/response-handler';
import AuthHelper from '../helper/auth-helper';
import Email from '../../../utils/email/email';
import AuthEmailHelper from '../helper/auth-email.helper';

class AuthController {
  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email } = req.body;
    try {
      const existingUser = await UserService.findUser({ email });
      const token = Jwt.createToken(existingUser._id, email);
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
        password,
      });
      if (!newUser) {
        return next(
          new HttpException(
            StatusCodes.BAD_REQUEST,
            'Something went wrong while trying to create user account',
          ),
        );
      }
      newUser.password = await AuthHelper.hashPassword(newUser.password);
      const token = Jwt.createToken(newUser._id, email);
      if (token) {
        const saved = await UserService.saveUser(newUser);
        if (saved._id) {
          await Email.sendEmail(
            AuthEmailHelper.createWelcomeEmail(saved.email),
          );
          return ResponseHandler.SuccessResponse(
            res,
            StatusCodes.CREATED,
            'User Created',
            {
              email,
            },
          );
        }
        return next(
          new HttpException(StatusCodes.BAD_REQUEST, 'Unable to save user'),
        );
      }
      return next(
        new HttpException(StatusCodes.BAD_REQUEST, 'Unable to create token'),
      );
    } catch (err) {
      return next(err);
    }
  };
}
export default AuthController;

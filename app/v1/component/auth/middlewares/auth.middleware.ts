import { NextFunction, Request, Response } from 'express';
import Bcrypt from '../../../package/bcrypt';
import * as message from '../message/auth.message';
import { StatusCodes } from 'http-status-codes';
import UserService from '../../user/service/user.service';
import HttpException from '../../../exception/http-exception';

const AuthMiddleware = {
  /**
   *
   * @param param0
   * @param res
   * @param next
   * @returns
   * @description check if the user password matches for
   * reset password functionality
   */
  async checkIfUserPasswordIsCorrect(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = body;
    try {
      const existingUser = await UserService.findUser({ email });
      /**
       * check password matches
       */
      const compare = await Bcrypt.comparePassword(
        password,
        existingUser.password,
      );
      if (compare) return next();

      return next(
        new HttpException(StatusCodes.BAD_REQUEST, 'Incorrect Credentials'),
      );
    } catch (e) {
      return next(e);
    }
  },

  async checkIfPasswordIsCorrect(
    request: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await UserService.findUser({ _id: request.user.id });
      const correctPassword = await Bcrypt.comparePassword(
        request.body.currentPassword,
        user.password,
      );
      if (correctPassword) {
        return next();
      }
      return next(
        new HttpException(
          StatusCodes.BAD_REQUEST,
          message.MESSAGE_UNAUTHORIZED_PASSWORD,
        ),
      );
    } catch (e) {
      return next(e);
    }
  },
};
export default AuthMiddleware;

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserRepository from '../user/repository/user.repository';
import Bcrypt from '../../lib/package/bcrypt';
import Jwt from '../../lib/package/jwt';
import { JWT_EXPIRY, JWT_SECRET } from '../../config/secrets';
import CustomError from '../../exception/custom-error';
import ResponseHandler from '../../lib/response-handler';
import { UnAuthorizedError } from '../../exception/un-authorized.error';
import { ClientError } from '../../exception/client.error';
import Email from '../../lib/email/email';
import AuthEmailHelper from './auth-email.helper';

class AuthController {
  public loginUser = async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const user = await UserRepository.findUser({
      email,
    });
    if (user) {
      const compare = await Bcrypt.comparePassword(password, user.password);
      if (compare) {
        const token = Jwt.createToken(
          { id: user._id, email: user.email },
          JWT_SECRET,
          JWT_EXPIRY,
        );
        if (!token) {
          throw new CustomError(
            StatusCodes.BAD_REQUEST,
            'Unable to create token',
          );
        }
        return ResponseHandler.SuccessResponse(
          response,
          StatusCodes.OK,
          'Log in successful',
          {
            email: user.email,
            id: user._id,
            token,
          },
        );
      }
      throw new UnAuthorizedError('Incorrect Credentials');
    }
    throw new ClientError('User does not exist');
  };

  public register = async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const user = await UserRepository.findUser({ email });
    if (user) {
      throw new ClientError('This mail is already connected to an account');
    }
    const newUser = await UserRepository.createUser({
      email,
      password: await Bcrypt.hashPassword(password),
    });
    if (!newUser._id)
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Unable to save user',
      );
    const token = Jwt.createToken(
      { id: newUser._id, email },
      JWT_SECRET,
      JWT_EXPIRY,
    );
    await Email.sendEmail(AuthEmailHelper.createWelcomeEmail(email));
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.CREATED,
      'User Created',
      {
        email,
        token,
      },
    );
  };
}
export default AuthController;

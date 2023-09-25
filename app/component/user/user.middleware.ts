import { NextFunction, Request, Response } from 'express';
import UserRepository from './repository/user.repository';
import { ClientError } from '../../exception/client.error';

const UserMiddleware = {
  /**
   * basically checks if the user in the req.user exists
   * @param request
   * @param res
   * @param next
   */
  async checkIfAValidUser(request: Request, res: Response, next: NextFunction) {
    const user = await UserRepository.findUser({ _id: request.user.id });

    if (user) {
      return next();
    }
    throw new ClientError('This account is not connected to a user');
  },
};
export default UserMiddleware;

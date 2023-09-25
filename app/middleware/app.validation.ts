import { NextFunction, Request, Response } from 'express';
import Helper from '../lib/helper';
import { ClientError } from '../exception/client.error';
import { UnknownInterface } from '../lib/unknown.interface';

const AppValidation = {
  async idValidator(
    next: NextFunction,
    response: Response,
    id: UnknownInterface,
  ) {
    if (Helper.validObjectId(id)) {
      return next();
    }
    return next(new ClientError('Incorrect Id Format, Kindly Check The Id'));
  },
  async bodyBaseValidator(
    request: Request,
    response: Response,
    next: NextFunction,
    schema: UnknownInterface,
  ) {
    try {
      request.body = await schema.validateAsync(request.body);
      return next();
    } catch (error) {
      return next(new ClientError(error.message.replace(/["]/gi, '')));
    }
  },
};
export default AppValidation;

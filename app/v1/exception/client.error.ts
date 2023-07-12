import { StatusCodes } from 'http-status-codes';
import { UnknownInterface } from '../lib/unknown.interface';
import CustomError from './custom-error';

export class ClientError extends CustomError {
  constructor(message: string, error?: UnknownInterface) {
    super(StatusCodes.BAD_REQUEST, message, error);
  }
}

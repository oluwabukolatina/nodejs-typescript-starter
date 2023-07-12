import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../middleware/app.validation';

const AuthValidation = {
  async validateRegister(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      email: Joi.string().email().label('Email').required(),
      password: Joi.string()
        .label('Password')
        .regex(/^(?=.*[@$!%*?.&])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .message(
          'Password should contain at least 8 characters; 1 symbol, 1 number and 1 uppercase letter.',
        )
        .min(8)
        .required(),
    });
    await AppValidation.bodyBaseValidator(request, response, next, schema);
  },
  async validateLogin(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      email: Joi.string().email().label('Email').required(),
      password: Joi.string().label('Password').required(),
    });
    await AppValidation.bodyBaseValidator(request, response, next, schema);
  },
};
export default AuthValidation;

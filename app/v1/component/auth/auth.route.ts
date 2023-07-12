import { Application } from 'express';
import AuthController from './auth.controller';
import * as url from './auth.url';
import AuthValidation from './auth.validation';
import { asyncHandler } from '../../middleware/async-handler';

class AuthRoute {
  public authController: AuthController = new AuthController();

  public routes = (app: Application): void => {
    app
      .route(`${url.LOGIN_URL}`)
      .post(
        AuthValidation.validateLogin,
        asyncHandler(this.authController.loginUser),
      );
    app
      .route(`${url.REGISTER_URL}`)
      .post(
        AuthValidation.validateRegister,
        asyncHandler(this.authController.register),
      );
  };
}
export default AuthRoute;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const response_handler_1 = __importDefault(require("../../../utils/response-handler"));
const bcrypt_1 = __importDefault(require("../../../package/bcrypt"));
const email_1 = __importDefault(require("../../../utils/email/email"));
const auth_email_helper_1 = __importDefault(require("../helper/auth-email.helper"));
const user_service_1 = __importDefault(require("../../user/service/user.service"));
const http_exception_1 = __importDefault(require("../../../exception/http-exception"));
const secrets_1 = require("../../../config/secrets");
const jwt_1 = __importDefault(require("../../../package/jwt"));
class AuthController {
    constructor() {
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const existingUser = yield user_service_1.default.findUser({ email });
                const token = jwt_1.default.createToken({ id: existingUser._id, email: existingUser.email }, secrets_1.JWT_SECRET, secrets_1.JWT_EXPIRY);
                if (!token) {
                    return next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Unable to create token'));
                }
                return response_handler_1.default.SuccessResponse(res, http_status_codes_1.StatusCodes.OK, 'Log in successful', {
                    email: existingUser.email,
                    id: existingUser._id,
                    token,
                });
            }
            catch (err) {
                return next(err);
            }
        });
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const newUser = yield user_service_1.default.createUser({
                    email,
                    password: yield bcrypt_1.default.hashPassword(password),
                });
                if (!newUser._id)
                    return next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Unable to save user'));
                const token = jwt_1.default.createToken({ id: newUser._id, email }, secrets_1.JWT_SECRET, secrets_1.JWT_EXPIRY);
                yield email_1.default.sendEmail(auth_email_helper_1.default.createWelcomeEmail(email));
                return response_handler_1.default.SuccessResponse(res, http_status_codes_1.StatusCodes.CREATED, 'User Created', {
                    email,
                    token,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map
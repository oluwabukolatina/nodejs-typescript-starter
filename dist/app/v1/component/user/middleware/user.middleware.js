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
const user_service_1 = __importDefault(require("../service/user.service"));
const http_status_codes_1 = require("http-status-codes");
const http_exception_1 = __importDefault(require("../../../exception/http-exception"));
const UserMiddleware = {
    checkIfUserExists(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.findUser({
                    email: request.body.email,
                });
                if (!user) {
                    return next(new http_exception_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User does not exist'));
                }
                return next();
            }
            catch (e) {
                return next(e);
            }
        });
    },
    /**
     * to sign the user
     * @param body
     * @param res
     * @param next
     */
    checkIfARegisteredUser({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = body;
            try {
                const user = yield user_service_1.default.findUser({ email });
                if (user) {
                    return next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'This mail is already connected to an account'));
                }
                return next();
            }
            catch (e) {
                return next(e);
            }
        });
    },
    /**
     * basically checks if the user in the req.user exists
     * @param request
     * @param res
     * @param next
     */
    checkIfAValidUser(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.findUser({ _id: request.user.id });
                if (user) {
                    return next();
                }
                return next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'This account is not connected to a user'));
            }
            catch (e) {
                return next(e);
            }
        });
    },
};
exports.default = UserMiddleware;
//# sourceMappingURL=user.middleware.js.map
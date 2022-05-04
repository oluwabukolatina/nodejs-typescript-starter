"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../utils/logger"));
const secrets_1 = require("../config/secrets");
const response_handler_1 = __importDefault(require("../utils/response-handler"));
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message.toString() || 'Something went wrong';
    const err = error.error || null;
    if (secrets_1.ENVIRONMENT !== 'test') {
        logger_1.default.error(`BODY- ${JSON.stringify(request.body)}, STATUS - ${status}, MESSAGE - ${message}, URL - ${request.originalUrl}, METHOD - ${request.method}, IP - ${request.ip}`);
    }
    if (status === http_status_codes_1.StatusCodes.BAD_REQUEST) {
        return response_handler_1.default.BadRequestResponse(response, message, err);
    }
    return response_handler_1.default.ServerErrorResponse(response, status, message, err);
}
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map
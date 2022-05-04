"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
function loggerMiddleware(error, request) {
    const status = error.status || 500;
    logger_1.default.info(`status - ${status}, url - ${request.originalUrl}, method - ${request.method},IP - ${request.ip}, body- ${JSON.stringify(request.body)}`);
}
exports.default = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map
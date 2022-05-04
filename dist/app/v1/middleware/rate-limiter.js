"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_status_codes_1 = require("http-status-codes");
const http_exception_1 = __importDefault(require("../exception/http-exception"));
const maxRequest = 5;
const rateLimiter = express_rate_limit_1.default({
    windowMs: 15 * 60 * 1000,
    max: maxRequest,
    skipSuccessfulRequests: true,
    // message: 'You have exceeded the 100 requests',
    // headers: true,
    handler(req, res, next) {
        return next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `You have exceeded the ${maxRequest} requests`));
    },
});
exports.default = rateLimiter;
//# sourceMappingURL=rate-limiter.js.map
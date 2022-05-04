"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRY = exports.JWT_SECRET = exports.ENVIRONMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../utils/logger"));
if (fs_1.default.existsSync('.env')) {
    logger_1.default.debug('Using .env file to supply config environment variables');
    dotenv_1.default.config({ path: '.env' });
}
function throwIfUndefined(secret, name) {
    if (!secret) {
        logger_1.default.error(`${name} must not be undefined`);
        return process.exit(1);
    }
    return secret;
}
exports.ENVIRONMENT = throwIfUndefined(process.env.NODE_ENV, 'NODE_ENV');
throwIfUndefined(process.env.DATABASE_URL, 'DATABASE_URL');
throwIfUndefined(process.env.DEV_DATABASE_URL, 'DEV_DATABASE_URL');
throwIfUndefined(process.env.TEST_DATABASE_URL, 'TEST_DATABASE_URL');
exports.JWT_SECRET = throwIfUndefined(process.env.JWT_SECRET, 'JWT_SECRET');
exports.JWT_EXPIRY = throwIfUndefined(process.env.JWT_EXPIRY, 'JWT_EXPIRY');
throwIfUndefined(process.env.GMAIL_USERNAME, 'GMAIL_USERNAME');
throwIfUndefined(process.env.GMAIL_PASSWORD, 'GMAIL_PASSWORD');
//# sourceMappingURL=secrets.js.map
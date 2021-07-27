"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_DATABASE_URL = exports.MAIL_TRAP_PASSWORD = exports.MAIL_TRAP_USER = exports.LOGS_DB = exports.DEV_DATABASE_URL = exports.ENVIRONMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./logger"));
if (fs_1.default.existsSync('.env')) {
    dotenv_1.default.config({ path: '.env' });
    logger_1.default.debug('Using .env file to supply config environment variables');
}
function throwIfUndefined(secret, name) {
    if (!secret) {
        logger_1.default.error(`${name} must not be undefined`);
        return process.exit(1);
    }
    return secret;
}
exports.ENVIRONMENT = throwIfUndefined(process.env.NODE_ENV, 'NODE_ENV');
exports.DEV_DATABASE_URL = throwIfUndefined(process.env.DEV_DATABASE_URL, 'DEV_DATABASE_URL');
exports.LOGS_DB = throwIfUndefined(process.env.LOGS_DB, 'LOGS_DB');
exports.MAIL_TRAP_USER = throwIfUndefined(process.env.MAIL_TRAP_USER, 'MAIL_TRAP_USER');
exports.MAIL_TRAP_PASSWORD = throwIfUndefined(process.env.MAIL_TRAP_PASSWORD, 'MAIL_TRAP_PASSWORD');
exports.TEST_DATABASE_URL = throwIfUndefined(process.env.TEST_DATABASE_URL, 'TEST_DATABASE_URL');
//# sourceMappingURL=secrets.js.map
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
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./v1/utils/logger"));
const database_1 = __importDefault(require("./v1/database/database"));
const email_1 = __importDefault(require("./v1/utils/email/email"));
const secrets_1 = require("./v1/config/secrets");
const env = require('./v1/config/env')[String(secrets_1.ENVIRONMENT)];
const { myEmail, emailUsername } = env;
if (!process.env.PORT) {
    process.exit(1);
}
const APP_PORT = parseInt(process.env.PORT, 10) || 3000;
const server = app_1.default.listen(APP_PORT, () => {
    database_1.default
        .connectToDb()
        .then((response) => {
        logger_1.default.info(response.connection.host, 'connection host');
        logger_1.default.info(`Server started at ${APP_PORT}`);
    })
        .catch(() => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.error('Unable to connect to the database');
        yield email_1.default.sendEmail({
            to: myEmail,
            from: emailUsername,
            subject: 'database down',
            text: 'database is down and not connecting',
            html: 'database is down and not connecting...',
        });
    }));
});
process.on('unhandledRejection', (err, promise) => {
    logger_1.default.info(err);
    logger_1.default.info(promise);
    server.close(() => process.exit(1));
});
//# sourceMappingURL=server.js.map
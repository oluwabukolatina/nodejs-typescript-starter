"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_mongodb_1 = require("winston-mongodb");
require("winston-daily-rotate-file");
const secrets_1 = require("./secrets");
const { json, prettyPrint, splat, simple, timestamp, printf, cli, combine, colorize, label, } = winston_1.default.format;
const { transports, createLogger } = winston_1.default;
const format = cli({
    colors: {
        info: 'blue',
        error: 'red',
        warn: 'yellow',
        http: 'magenta',
        debug: 'white',
    },
});
const level = () => {
    return secrets_1.ENVIRONMENT === 'development' ? 'debug' : 'info';
};
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const mongoOptions = {
    db: secrets_1.LOGS_DB,
    // level: process.env.LOGGING_LEVEL,
    // name: 'mongodb',
    collection: 'logs',
    decolorize: true,
    tryReconnect: true,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
};
const options = {
    levels,
    level: level(),
    transports: [
        new winston_mongodb_1.MongoDB(mongoOptions),
        new transports.Console({
            level: secrets_1.ENVIRONMENT === 'production' ? 'error' : 'debug',
            format,
        }),
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new transports.File({ filename: 'logs/debug.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
        new winston_1.default.transports.File({
            filename: 'logs/server/error.log',
            level: 'error',
            handleExceptions: true,
        }),
        new winston_1.default.transports.File({
            filename: 'logs/server/all.log',
            level: 'info',
            handleExceptions: true,
        }),
        new winston_1.default.transports.DailyRotateFile({
            maxFiles: '14d',
            level: 'info',
            dirname: 'logs/server/daily',
            datePattern: 'YYYY-MM-DD',
            filename: '%DATE%.log',
        }),
    ],
    format: combine(colorize({ all: true }), label({
        label: 'Label🏷️',
    }), json(), prettyPrint(), splat(), simple(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), printf((info) => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`)),
};
const logger = createLogger(options);
if (secrets_1.ENVIRONMENT !== 'production') {
    logger.debug('Logging initialized at debug level');
}
exports.default = logger;
//# sourceMappingURL=logger.js.map
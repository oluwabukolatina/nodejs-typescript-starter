import winston from 'winston';
import { ENVIRONMENT, LOGS_DB } from './secrets';
import { MongoDB } from "winston-mongodb";

const {
  json,
  prettyPrint,
  splat,
  simple,
  timestamp,
  printf,
  cli,
  combine,
  colorize,
  label,
} = winston.format;
const { transports, createLogger } = winston;
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
  return ENVIRONMENT === 'development' ? 'debug' : 'info';
};
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
const mongoOptions = {
  db:LOGS_DB,
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

const options: winston.LoggerOptions = {
  levels,
  level: level(),
  transports: [

    new MongoDB(mongoOptions),
    new transports.Console({
      level: ENVIRONMENT === 'production' ? 'error' : 'debug',
      format,
    }),
    new transports.File({ filename: 'logs/debug.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),

  ],
  format: combine(
    colorize({ all: true }),
    label({
      label: 'Label🏷️'
    }),
    json(),
    prettyPrint(),
    splat(),
    simple(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    printf(
      (info) =>
        `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`,
    ),
  ),
};

const logger = createLogger(options);
if (ENVIRONMENT !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;

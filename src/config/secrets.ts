import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
  logger.debug('Using .env file to supply config environment variables');
}
function throwIfUndefined<T>(secret: T | undefined, name?: string): T {
  if (!secret) {
    logger.error(`${name} must not be undefined`);
    return process.exit(1);
  }
  return secret;
}
export const ENVIRONMENT = throwIfUndefined(process.env.NODE_ENV, 'NODE_ENV');
export const DEV_DATABASE_URL = throwIfUndefined(
  process.env.DEV_DATABASE_URL,
  'DEV_DATABASE_URL',
);
// export const LOGS_DB = throwIfUndefined(process.env.LOGS_DB, 'LOGS_DB');
// export const MAIL_TRAP_USER = throwIfUndefined(
//   process.env.MAIL_TRAP_USER,
//   'MAIL_TRAP_USER',
// );
// export const MAIL_TRAP_PASSWORD = throwIfUndefined(
//   process.env.MAIL_TRAP_PASSWORD,
//   'MAIL_TRAP_PASSWORD',
// );
// export const TEST_DATABASE_URL = throwIfUndefined(
//   process.env.TEST_DATABASE_URL,
//   'TEST_DATABASE_URL',
// );
export const APP_PORT = throwIfUndefined(process.env.APP_PORT, 'APP_PORT');

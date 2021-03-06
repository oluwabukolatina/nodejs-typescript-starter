import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
}
function throwIfUndefined<T>(secret: T | undefined, name?: string): T {
  if (!secret) {
    logger.error(`${name} must not be undefined`);
    return process.exit(1);
  }
  return secret;
}
export const ENVIRONMENT = process.env.NODE_ENV;
export const APP_DB = throwIfUndefined(process.env.APP_DB, 'APP_DB');
export const LOGS_DB = throwIfUndefined(process.env.LOGS_DB, 'LOGS_DB');
export const MAIL_TRAP_USER = throwIfUndefined(
  process.env.MAIL_TRAP_USER,
  'MAIL_TRAP_USER',
);
export const MAIL_TRAP_PASSWORD = throwIfUndefined(
  process.env.MAIL_TRAP_PASSWORD,
  'MAIL_TRAP_PASSWORD',
);

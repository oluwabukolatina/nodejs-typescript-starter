import dotenv from 'dotenv';
import fs from 'fs';
import logger from '../lib/logger';

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
export const ENVIRONMENT = throwIfUndefined(process.env.NODE_ENV, 'NODE_ENV');
throwIfUndefined(process.env.DATABASE_URL, 'DATABASE_URL');
throwIfUndefined(process.env.DEV_DATABASE_URL, 'DEV_DATABASE_URL');
throwIfUndefined(process.env.TEST_DATABASE_URL, 'TEST_DATABASE_URL');
export const JWT_SECRET = throwIfUndefined(
  process.env.JWT_SECRET,
  'JWT_SECRET',
);
export const JWT_EXPIRY = throwIfUndefined(
  process.env.JWT_EXPIRY,
  'JWT_EXPIRY',
);
export const MAIL_TRAP_USERNAME = throwIfUndefined(
  process.env.MAIL_TRAP_USERNAME,
  'MAIL_TRAP_USERNAME',
);
export const MAIL_TRAP_PASSWORD = throwIfUndefined(
  process.env.MAIL_TRAP_PASSWORD,
  'MAIL_TRAP_PASSWORD',
);

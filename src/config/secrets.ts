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
export const ENVIRONMENT = throwIfUndefined(process.env.NODE_ENV, 'NODE_ENV');

throwIfUndefined(
  process.env.STARTER_DEV_DATABASE_URL,
  'STARTER_DEV_DATABASE_URL',
);
throwIfUndefined(
  process.env.STARTER_TEST_DATABASE_URL,
  'STARTER_TEST_DATABASE_URL',
);
export const STARTER_JWT_SECRET = throwIfUndefined(
  process.env.STARTER_JWT_TOKEN,
  'STARTER_JWT_TOKEN',
);
export const STARTER_JWT_EXPIRY = throwIfUndefined(
  process.env.STARTER_JWT_EXPIRY,
  'STARTER_JWT_EXPIRY',
);
throwIfUndefined(
  process.env.STARTER_DEV_GMAIL_USERNAME,
  'STARTER_DEV_GMAIL_USERNAME',
);
throwIfUndefined(
  process.env.STARTER_DEV_GMAIL_PASSWORD,
  'STARTER_DEV_GMAIL_PASSWORD',
);

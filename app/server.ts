import app from './app';
import logger from './v1/lib/logger';
import database from './v1/database/database';
import Email from './v1/lib/email/email';
import { ENVIRONMENT } from './v1/config/secrets';

const env = require('./v1/config/env')[String(ENVIRONMENT)];

const { myEmail, emailUsername } = env;
if (!process.env.PORT) {
  process.exit(1);
}
const APP_PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

const server = app.listen(APP_PORT, () => {
  database
    .connectToDb()
    .then((response) => {
      logger.info(response.connection.host, 'connection host');
      logger.info(`Server started at ${APP_PORT}`);
    })
    .catch(async () => {
      logger.error('Unable to connect to the database');
      await Email.sendEmail({
        to: myEmail,
        from: emailUsername,
        subject: 'database down',
        text: 'database is down and not connecting',
        html: 'database is down and not connecting...',
      });
    });
});
process.on('unhandledRejection', (err, promise) => {
  logger.info(err);
  logger.info(promise);
  server.close(() => process.exit(1));
});

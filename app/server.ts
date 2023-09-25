import app from './app';
import database from './database/database';
import logger from './lib/logger';
import Email from './lib/email/email';
import EnvHelper from './config/env.helper';

if (!process.env.PORT) {
  process.exit(1);
}
const APP_PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

const server = app.listen(APP_PORT, () => {
  database
    .connectToDatabase()
    .then((response) => {
      logger.info(response.connection.host, 'connection host');
      logger.info(`Server started at ${APP_PORT}`);
    })
    .catch(async () => {
      logger.error('Unable to connect to the database');
      await Email.sendEmail({
        to: EnvHelper.getMyEmail(),
        from: EnvHelper.getEmailUsername(),
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

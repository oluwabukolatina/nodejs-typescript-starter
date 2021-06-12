import app from '../app';
import db from '../config/database/database';
import logger from '../config/logger';

if (!process.env.PORT) {
  process.exit(1);
}
const APP_PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
app.listen(APP_PORT, () => {
  db.connectToDb()
    .then(() => {
      logger.info('connected');
      logger.info(`App is running at ${APP_PORT}`);
    })
    .catch(() => logger.error('Internal server error happened'));
});

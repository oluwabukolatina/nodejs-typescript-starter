import app from '../app';
import db from '../config/database/database';
import logger from '../config/logger';
import { APP_PORT } from '../config/secrets';

if (!APP_PORT) {
  process.exit(1);
}
const PORT: number = parseInt(APP_PORT as string, 10) || 3000;
app.listen(PORT, () => {
  db.connectToDb()
    .then(() => {
      logger.info('connected');
      logger.info(`App is running at ${PORT}`);
    })
    .catch(() => logger.error('Internal server error happened'));
});

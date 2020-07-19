import { app } from '../index';
import db from '../utils/database';
/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10) || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  db.connectToDb().then(() => console.log('connected to db'))
  // eslint-disable-next-line no-console
    .catch(() => console.log('something went wrong'));
});

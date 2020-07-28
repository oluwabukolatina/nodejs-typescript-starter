import app from '../app';
import db from '../utils/database';
/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10) || 3000;
app.listen(PORT, () => {
  db.connectToDb()
    // eslint-disable-next-line no-console
    .then(() => console.log('connected to db'))
    // eslint-disable-next-line no-console
    .catch(() => console.log('something went wrong'));
});

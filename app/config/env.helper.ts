import { ENVIRONMENT } from './secrets';

const env = require('./env')[String(ENVIRONMENT)];

const { database, myEmail, emailUsername } = env;

const EnvHelper = {
  getMyEmail() {
    return myEmail;
  },
  getEmailUsername() {
    return emailUsername;
  },
  getDatabase() {
    return database;
  },
};
export default EnvHelper;

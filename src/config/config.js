module.exports = {
  development: {
    database: process.env.DEV_DATABASE_URL,
  },
  test: {
    database: process.env.TEST_DATABASE_URL,
  },
  production: {
    operatorsAliases: false,
  },
};

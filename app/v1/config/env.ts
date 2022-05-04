module.exports = {
  development: {
    database: process.env.DATABASE_URL,
    emailUserName: process.env.GMAIL_USERNAME,
    emailPassword: process.env.GMAIL_PASSWORD,
  },
  test: {
    database: process.env.TEST_DATABASE_URL,
    emailUserName: process.env.GMAIL_USERNAME,
    emailPassword: process.env.GMAIL_PASSWORD,
  },
};

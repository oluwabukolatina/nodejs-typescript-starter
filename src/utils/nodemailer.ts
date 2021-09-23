import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.STARTER_DEV_GMAIL_USERNAME,
    pass: process.env.STARTER_DEV_GMAIL_PASSWORD,
  },

  secure: false,
});

export default transporter;

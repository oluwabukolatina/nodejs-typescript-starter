import { ENVIRONMENT } from '../../config/secrets';
import nodemailer from 'nodemailer';

const env = require('../../../src/config/env')[String(ENVIRONMENT)];

const transporter = nodemailer.createTransport({
  host: 'mail.google.com',
  service: 'gmail',
  port: 465,
  auth: {
    user: env.emailUserName,
    pass: env.emailPassword,
  },
  secure: false,
});

export default transporter;

import nodemailer from 'nodemailer';
import { ENVIRONMENT } from '../../../config/secrets';
const env = require('../../../config/env')[String(ENVIRONMENT)];
export const transporter = nodemailer.createTransport({
  host: 'mail.google.com',
  service: 'gmail',
  port: 465,
  auth: {
    user: env.emailUsername,
    pass: env.emailPassword,
  },
  secure: false,
});

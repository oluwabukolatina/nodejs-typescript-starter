import nodemailer from 'nodemailer';
import {
  MAIL_TRAP_PASSWORD,
  MAIL_TRAP_USERNAME,
} from '../../../../config/secrets';

export const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: MAIL_TRAP_USERNAME,
    pass: MAIL_TRAP_PASSWORD,
  },
});

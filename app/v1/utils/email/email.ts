import { MailInterface } from './email.interface';
import { ENVIRONMENT } from '../../config/secrets';
import Nodemailer from '../../package/mail/nodemailer/nodemailer';
import logger from '../logger';

const Email = {
  async sendEmail(options: MailInterface) {
    logger.info(options.to);
    logger.info(options.subject);
    return ENVIRONMENT === 'production'
      ? logger.info('ypur prod email setup')
      : Nodemailer.sendMail(options);
  },
};

export default Email;

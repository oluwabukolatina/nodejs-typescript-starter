import { transporter } from './nodemailer.config';
import { MailInterface } from '../../../email/email.interface';
import logger from '../../../logger';

const Nodemailer = {
  sendMail(options: MailInterface) {
    return transporter.sendMail(options, (err, info) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info('Mail Sent Successfully', info);
      }
    });
  },
};
export default Nodemailer;

import { ENVIRONMENT } from '../../config/secrets';
import EmailTemplatesHelper from '../../../html/helper/email-template.helper';

const env = require('../../config/env')[String(ENVIRONMENT)];

const AuthEmailHelper = {
  createWelcomeEmail(email: string) {
    return {
      subject: 'Welcome To Starter',
      from: env.emailUserName,
      to: email,
      html: EmailTemplatesHelper.generateTemplate(
        { email },
        'welcome-mail.html',
      ),
    };
  },
};
export default AuthEmailHelper;

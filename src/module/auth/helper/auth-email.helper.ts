import { ENVIRONMENT } from '../../../config/secrets';
import EmailTemplatesHelper from '../../../utils/email/helper';

const env = require('../../../config/env')[String(ENVIRONMENT)];

const AuthEmailHelper = {
  createWelcomeEmail(email: string) {
    return {
      subject: 'Welcome To Starter',
      from: env.emailUserName,
      to: email,
      html: EmailTemplatesHelper.generateTemplate(
        { email },
        'welcome-email.html',
      ),
    };
  },
};
export default AuthEmailHelper;

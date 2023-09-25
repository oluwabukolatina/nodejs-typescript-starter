import EmailTemplatesHelper from '../../html/helper/email-template.helper';
import EnvHelper from '../../config/env.helper';

const AuthEmailHelper = {
  createWelcomeEmail(email: string) {
    return {
      subject: 'Welcome To Starter',
      from: EnvHelper.getEmailUsername(),
      to: email,
      html: EmailTemplatesHelper.generateTemplate(
        { email },
        'welcome-mail.html',
      ),
    };
  },
};
export default AuthEmailHelper;

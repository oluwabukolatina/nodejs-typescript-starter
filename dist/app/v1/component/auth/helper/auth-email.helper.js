"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_1 = require("../../../config/secrets");
const email_template_helper_1 = __importDefault(require("../../../../html/helper/email-template.helper"));
const env = require('../../../config/env')[String(secrets_1.ENVIRONMENT)];
const AuthEmailHelper = {
    createWelcomeEmail(email) {
        return {
            subject: 'Welcome To Starter',
            from: env.emailUserName,
            to: email,
            html: email_template_helper_1.default.generateTemplate({ email }, 'welcome-mail.html'),
        };
    },
};
exports.default = AuthEmailHelper;
//# sourceMappingURL=auth-email.helper.js.map
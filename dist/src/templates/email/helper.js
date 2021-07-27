"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nunjucks_1 = __importDefault(require("nunjucks"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const EmailTemplates = {
    generateResetEmail(link) {
        nunjucks_1.default.configure({ autoescape: true });
        return nunjucks_1.default.renderString(fs_1.default
            .readFileSync(path_1.default.join(__dirname, '/email-for-password-reset.html'))
            .toString('utf-8'), {
            link,
        });
    },
    generateWelcomeEmail(name, url) {
        nunjucks_1.default.configure({ autoescape: true });
        return nunjucks_1.default.renderString(fs_1.default
            .readFileSync(path_1.default.join(__dirname, '/welcome-email.html'))
            .toString('utf-8'), { name, url });
    },
    generateNewUserEmail(name, email, phoneNumber) {
        nunjucks_1.default.configure({ autoescape: true });
        return nunjucks_1.default.renderString(fs_1.default
            .readFileSync(path_1.default.join(__dirname, '/new-user-notification-email.html'))
            .toString('utf-8'), { name, email, phoneNumber });
    },
    generateFailedSignUpEmailToAdmin(name, email, phoneNumber) {
        nunjucks_1.default.configure({ autoescape: true });
        return nunjucks_1.default.renderString(fs_1.default
            .readFileSync(path_1.default.join(__dirname, '/failed-user-signup.html'))
            .toString('utf-8'), { name, email, phoneNumber });
    },
};
exports.default = EmailTemplates;
//# sourceMappingURL=helper.js.map
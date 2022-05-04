"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const secrets_1 = require("../../../config/secrets");
const env = require('../../../config/env')[String(secrets_1.ENVIRONMENT)];
exports.transporter = nodemailer_1.default.createTransport({
    host: 'mail.google.com',
    service: 'gmail',
    port: 465,
    auth: {
        user: env.emailUsername,
        pass: env.emailPassword,
    },
    secure: false,
});
//# sourceMappingURL=nodemailer.config.js.map
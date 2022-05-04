"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_config_1 = require("./nodemailer.config");
const logger_1 = __importDefault(require("../../../utils/logger"));
const Nodemailer = {
    sendMail(options) {
        return nodemailer_config_1.transporter.sendMail(options, (err, info) => {
            if (err) {
                logger_1.default.error(err);
            }
            else {
                logger_1.default.info('Mail Sent Successfully', info);
            }
        });
    },
};
exports.default = Nodemailer;
//# sourceMappingURL=nodemailer.js.map
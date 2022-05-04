"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Jwt = {
    createToken(payload, secret, expiry) {
        console.log(payload, secret, expiry);
        return jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: expiry,
        });
    },
    verifyToken(token, key) {
        return jsonwebtoken_1.default.verify(token, key, (err, decoded) => {
            if (err)
                return err;
            return decoded;
        });
    },
};
exports.default = Jwt;
//# sourceMappingURL=jwt.js.map
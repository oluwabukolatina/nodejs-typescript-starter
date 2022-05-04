"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const secrets_1 = require("../config/secrets");
const env = require('../config/env')[String(secrets_1.ENVIRONMENT)];
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        return mongoose_1.connect(env.database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    });
}
function disconnectFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        return mongoose_1.disconnect();
    });
}
exports.default = { connectToDb, disconnectFromDB };
//# sourceMappingURL=database.js.map
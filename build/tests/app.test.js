"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
require("chai/register-should");
const chai_http_1 = __importDefault(require("chai-http"));
const app_1 = __importDefault(require("../src/app"));
chai_1.default.use(chai_http_1.default);
describe('Hello API Request', () => {
    it('should return response on call', () => chai_1.default
        .request(app_1.default)
        .get('/')
        .then((res) => {
        console.log(res.text);
        chai_1.default.expect(res.text).to.eql('Hello Node/Typescript starter!');
    }));
});
//# sourceMappingURL=app.test.js.map
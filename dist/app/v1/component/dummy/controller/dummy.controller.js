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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const response_handler_1 = __importDefault(require("../../../utils/response-handler"));
const dummy_service_1 = __importDefault(require("../service/dummy.service"));
const http_exception_1 = __importDefault(require("../../../exception/http-exception"));
class DummyController {
    constructor() {
        this.createDummy = ({ body }, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dummy = yield dummy_service_1.default.create(body);
                if (!dummy) {
                    return next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Not created'));
                }
                return response_handler_1.default.CreatedResponse(res, 'Created', dummy);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = DummyController;
//# sourceMappingURL=dummy.controller.js.map
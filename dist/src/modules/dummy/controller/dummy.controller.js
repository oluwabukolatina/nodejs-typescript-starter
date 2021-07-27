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
const logger_1 = __importDefault(require("../../../config/logger"));
const responseHandler_1 = __importDefault(require("../../../utils/responseHandler"));
const dummy_service_1 = __importDefault(require("../service/dummy.service"));
class DummyController {
    constructor() {
        this.createDummy = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const dummy = yield dummy_service_1.default.create(body);
            logger_1.default.info(body);
            if (!dummy)
                responseHandler_1.default.ErrorResponse(res, 400, false, 'try again');
        });
    }
}
exports.default = DummyController;
//# sourceMappingURL=dummy.controller.js.map
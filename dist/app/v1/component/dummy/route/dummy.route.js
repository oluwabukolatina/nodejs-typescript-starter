"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dummy_controller_1 = __importDefault(require("../controller/dummy.controller"));
const dummy_url_1 = require("../url/dummy.url");
const dummy_validation_1 = __importDefault(require("../validation/dummy.validation"));
class DummyRoute {
    constructor() {
        this.dummyController = new dummy_controller_1.default();
        this.routes = (app) => {
            app
                .route(dummy_url_1.CREATE_DUMMY_URL)
                .post(dummy_validation_1.default.validateCreateDummy, this.dummyController.createDummy);
        };
    }
}
exports.default = DummyRoute;
//# sourceMappingURL=dummy.route.js.map
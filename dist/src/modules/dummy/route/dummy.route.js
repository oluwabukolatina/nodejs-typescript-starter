"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dummy_controller_1 = __importDefault(require("../controller/dummy.controller"));
class DummyRoutes {
    constructor() {
        this.dummyController = new dummy_controller_1.default();
        this.routes = (app) => {
            app.route(`/api/v1/starter/dummy`).post(this.dummyController.createDummy);
        };
    }
}
exports.default = DummyRoutes;
//# sourceMappingURL=dummy.route.js.map
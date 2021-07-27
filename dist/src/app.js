"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv = __importStar(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const dummy_route_1 = __importDefault(require("./modules/dummy/route/dummy.route"));
dotenv.config();
class App {
    constructor() {
        this.dummyRoutes = new dummy_route_1.default();
        this.config = () => {
            this.app.use(helmet_1.default());
            this.app.use(express_mongo_sanitize_1.default());
            this.app.use(cors_1.default());
            this.app.use(express_1.default.json());
            this.app.use(morgan_1.default('dev'));
        };
        this.app = express_1.default();
        this.config();
        this.dummyRoutes.routes(this.app);
        this.app.disable('x-powered-by');
        this.app.get('/', (req, res) => res.send('Hello! Welcome!'));
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.API_BASE_PATH = exports.VERSION = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config();
require("express-async-errors");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = require("./routes");
var error_handler_middleware_1 = require("./middlewares/error-handler/error-handler.middleware");
var app = (0, express_1.default)();
exports.VERSION = 1;
exports.API_BASE_PATH = "/api/v".concat(exports.VERSION);
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
exports.router = express_1.default.Router();
app.use(exports.router.use(exports.API_BASE_PATH, routes_1.router));
app.use(error_handler_middleware_1.errorHandler);
app.listen(process.env.PORT, function () {
    console.log("Listening on port ".concat(process.env.PORT, "..."));
});
//# sourceMappingURL=app.js.map
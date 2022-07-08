"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../../business/user/user.controller");
var incident_controller_1 = require("../../business/incident/incident.controller");
exports.router = express_1.default.Router();
exports.router.use(user_controller_1.BASE_PATH, user_controller_1.router);
exports.router.use('', incident_controller_1.router);
//# sourceMappingURL=index.js.map
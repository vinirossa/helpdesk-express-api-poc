"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var knex_1 = __importDefault(require("knex"));
var knexfile_1 = __importDefault(require("./knexfile"));
var env = process.env.NODE_ENV;
console.log('o ambiente é', process.env.NODE_ENV);
console.log('a con str é', process.env.DB_URL);
var configOptions = knexfile_1.default[env];
exports.db = (0, knex_1.default)(configOptions);
//# sourceMappingURL=database.js.map
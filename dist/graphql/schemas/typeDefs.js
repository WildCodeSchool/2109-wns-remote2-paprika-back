"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskSchemas_1 = __importDefault(require("./taskSchemas"));
const projectSchema_1 = __importDefault(require("./projectSchema"));
const typeDefs = [taskSchemas_1.default, projectSchema_1.default];
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map
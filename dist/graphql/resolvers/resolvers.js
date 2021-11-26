"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskResolver_1 = __importDefault(require("./taskResolver"));
const projectResolvers_1 = __importDefault(require("./projectResolvers"));
const resolvers = [taskResolver_1.default, projectResolvers_1.default];
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map
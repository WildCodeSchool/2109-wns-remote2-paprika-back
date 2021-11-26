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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const graphql_1 = require("graphql");
const prisma = new client_1.PrismaClient();
const dateScalar = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    }
});
exports.default = {
    Date: dateScalar,
    Query: {
        getAllProjects: () => __awaiter(void 0, void 0, void 0, function* () {
            const projects = yield prisma.project.findMany();
            return projects;
        }),
        getProject: (_, { projectId }) => __awaiter(void 0, void 0, void 0, function* () {
            const project = yield prisma.project.findUnique({
                where: {
                    id: projectId
                }
            });
            return project;
        })
    },
    Mutation: {
        createProject: (_, { projectInput }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.project.create({
                data: {
                    name: projectInput.name,
                    client: projectInput.client,
                    description: projectInput.description
                }
            });
        }),
        deleteProject: (_, { projectId }) => __awaiter(void 0, void 0, void 0, function* () {
            const deleted = yield prisma.project.delete({
                where: {
                    id: projectId
                }
            });
            return !!deleted;
        }),
        updateProject: (_, { projectId, updateProjectInput }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.project.update({
                where: {
                    id: projectId
                },
                data: {
                    startAt: updateProjectInput.startAt,
                    endAt: updateProjectInput.endAt,
                    name: updateProjectInput.name || undefined,
                    client: updateProjectInput.client || undefined,
                    description: updateProjectInput.description || undefined
                }
            });
        })
    }
};
//# sourceMappingURL=projectResolvers.js.map
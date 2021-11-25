"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const apollo_server_1 = require("apollo-server");
const resolvers_1 = __importDefault(require("./graphql/resolvers/resolvers"));
const typeDefs_1 = __importDefault(require("./graphql/schemas/typeDefs"));
require('dotenv').config();
const runServer = () => {
    const prisma = new client_1.PrismaClient();
    const server = new apollo_server_1.ApolloServer({
        resolvers: resolvers_1.default,
        typeDefs: typeDefs_1.default,
        context: () => ({
            prisma
        })
    });
    server.listen(4000, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
};
runServer();
//# sourceMappingURL=app.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
require("reflect-metadata");
// Test values
const typeDefs = (0, apollo_server_1.gql) `
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin'
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster'
    }
];
const resolvers = {
    Query: {
        books: () => books
    }
};
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
// Start Server
server.listen(4000, () => console.log('Server started on 4000'));
//# sourceMappingURL=app.js.map
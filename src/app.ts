import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import resolvers from './graphql/resolvers/resolvers';
import typeDefs from './graphql/schemas/typeDefs';

require('dotenv').config();

const runServer = () => {
  const prisma = new PrismaClient();

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: () => {
      return {
        prisma
      };
    }
  });

  server.listen(4000, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
};

runServer();

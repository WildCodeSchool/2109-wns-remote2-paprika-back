import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import * as dotenv from 'dotenv';
import resolvers from './graphql/resolvers/resolvers';
import typeDefs from './graphql/schemas/typeDefs';

dotenv.config();

const runServer = () => {
  const prisma = new PrismaClient();

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req }) => {
      const userId = req.headers.authorization || '';
      return {
        prisma,
        userId
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

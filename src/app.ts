import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import * as dotenv from 'dotenv';
import resolvers from './graphql/resolvers/resolvers';
import typeDefs from './graphql/schemas/typeDefs';
import getUser from './userContext';

dotenv.config();

const runServer = () => {
  const prisma = new PrismaClient();
  const server = new ApolloServer({
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true
    },
    resolvers,
    typeDefs,
    context: async ({ req, res }) => {
      const token = req.headers.cookie?.split('=');
      let user = null;
      if (req.headers.authorization?.includes('Bearer')) {
        user = await getUser(req.headers.authorization);
      } else if (token && token[0] === 'token') {
        user = await getUser(`Bearer ${token[1]}`);
      }
      return {
        prisma,
        user,
        res
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

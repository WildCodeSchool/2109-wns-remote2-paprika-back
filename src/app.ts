import { ApolloServer, gql } from 'apollo-server';
import 'reflect-metadata';

require('dotenv').config();

// Test values
const typeDefs = gql`
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

const server = new ApolloServer({ typeDefs, resolvers });

// Start Server
server.listen(4000, () => console.log('Server started on 4000'));

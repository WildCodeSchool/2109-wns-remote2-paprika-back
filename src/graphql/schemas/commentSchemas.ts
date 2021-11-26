import { gql } from 'apollo-server';

export default gql`
  scalar Date

  type Query {
    getCommentsByTask(taskId: String!): [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    createdAt: Date!
    userId: String!
    taskId: String!
  }
`;

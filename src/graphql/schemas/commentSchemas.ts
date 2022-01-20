import { gql } from 'apollo-server';

export default gql`
  scalar Date

  type Query {
    getCommentsByTask(taskId: String!): [Comment!]!
  }

  type Mutation {
    createComment(commentInput: CommentInput!): Comment!
    deleteComment(commentId: String!): Boolean!
  }

  type Comment {
    id: ID!
    content: String!
    createdAt: Date!
    userId: String!
    taskId: String!
  }

  input CommentInput {
    content: String!
    taskId: String!
  }
`;

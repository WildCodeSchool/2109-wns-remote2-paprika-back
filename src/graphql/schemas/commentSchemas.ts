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
    user: User
    taskId: String!
  }

  type User {
    id: ID!
    email: String!
    lastName: String!
    firstName: String!
    role: RoleSite!
  }

  input CommentInput {
    content: String!
    taskId: String!
    userId: String!
  }
`;

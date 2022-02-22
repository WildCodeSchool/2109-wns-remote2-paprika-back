import { gql } from 'apollo-server';

export default gql`
  type Query {
    getAllUsers: [User!]!
    getUser(userId: String!): User!
  }

  type Mutation {
    register(userInput: UserInput!): User!
    login(loginUserInput: LoginUserInput!): LoginResponse!
    deleteUser(userId: String!): Boolean
    updateUser(updateUserInput: UpdateUserInput!): User!
  }

  type User {
    id: ID!
    email: String!
    lastName: String!
    firstName: String!
    role: RoleSite
  }

  type LoginResponse {
    token: String
    user: User
  }

  input UserInput {
    email: String!
    password: String!
    lastName: String!
    firstName: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    userId: String!
    lastName: String
    firstName: String
    role: RoleSite
  }

  enum RoleSite {
    ADMIN
    USER
    PO
  }
`;

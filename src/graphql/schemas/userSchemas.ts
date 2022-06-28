import { gql } from 'apollo-server';

export default gql`
  type Query {
    getAllUsers: [User!]!
    getUser(userId: String!): User!
    getCurrentUser: User
  }

  type Mutation {
    register(userCreateInput: UserCreateInput!): AuthPayLoad!
    login(userLoginInput: UserLoginInput!): AuthPayLoad!
    logout: Boolean
    deleteUser(userId: String!): Boolean
    updateUser(updateUserInput: UpdateUserInput!): User!
  }

  type User {
    id: ID!
    email: String!
    lastName: String!
    firstName: String!
    role: RoleSite
    password: String!
  }

  type AuthPayLoad {
    token: String!
    user: User!
  }

  input UserCreateInput {
    email: String!
    lastName: String!
    firstName: String!
    role: RoleSite
    password: String!
  }

  input UserLoginInput {
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

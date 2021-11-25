import { gql } from 'apollo-server';

export default gql`    
    type Query {
        currentUser: User!
        getAllUsers: [User!]!
        getUser(userId: String!): User!
    }

    type Mutation {
        register(userInput: UserInput!): User!
        login(loginUserInput: LoginUserInput!): LoginResponse!
    }

    type User {
        id: ID!
        email: String!
        lastName: String!
        firstName: String!
    }

    type LoginResponse{
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
`
import { gql } from 'apollo-server';

export default gql`    
    type Query {
        currentUser: User!
    }

    type Mutation {
        register(userInput: UserInput!): User!
        login(email: String!, password: String!): LoginResponse!
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
`
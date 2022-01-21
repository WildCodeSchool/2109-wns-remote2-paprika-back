import { gql } from 'apollo-server';

export default gql`
  type Query {
    getAllDocumentsByProject(projectId: String!): [Document!]!
  }

  type Document {
    id: ID!
    name: String!
    projectId: String!
  }
`;

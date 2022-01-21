import { gql } from 'apollo-server';

export default gql`
  scalar Upload

  type Query {
    getAllDocumentsByProject(projectId: String!): [Document]
    getDocumentById(docId: String!): Document
  }

  type Mutation {
    addDocument(DocumentInput: DocumentInput!, file: Upload!): Document!
    deleteDocument(docId: String!): Document!
  }

  type Document {
    id: ID!
    name: String!
    fileName: String!
    projectId: String!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  input DocumentInput {
    name: String!
    projectId: String!
  }
`;

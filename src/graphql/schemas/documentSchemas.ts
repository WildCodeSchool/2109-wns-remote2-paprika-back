import { gql } from 'apollo-server';

export default gql`
  scalar Upload

  type Query {
    getAllDocumentsByProject(projectId: String!): [Document]
    getDocumentById(docId: String!): Document
  }

  type Mutation {
    addDocument(DocumentInput: DocumentInput!): Document!
    deleteDocument(docId: String!): Document!
    updateDocument(docId: String!, newName: String!): Document!
  }

  type Document {
    id: ID!
    name: String!
    fileName: String!
    projectId: String!
  }

  input DocumentInput {
    name: String!
    projectId: String!
  }
`;

import { gql } from 'apollo-server';

export default gql`
  scalar Date

  type Query {
    getAllProjects: [Project!]!
    getProject(projectId: String!): Project!
  }

  type Mutation {
    createProject(projectInput: ProjectInput!): Project!
    deleteProject(projectId: String!): Boolean
    updateProject(
      projectId: String!
      updateProjectInput: UpdateProjectInput!
    ): Project!
  }

  type Project {
    id: ID!
    startAt: Date
    endAt: Date
    name: String!
    client: String!
    description: String!
  }

  input ProjectInput {
    name: String!
    client: String!
    description: String!
  }

  input UpdateProjectInput {
    startAt: Date
    endAt: Date
    name: String
    client: String
    description: String
  }
`;

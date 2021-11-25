import { gql } from 'apollo-server';

export default gql`
  scalar Date

  type Query {
    getAllProjects: [Project!]!
    getProject(projectId: Int!): Project!
  }

  type Mutation {
    createProject(projectInput: ProjectInput!): Project!
    deleteProject(projectId: Int!): Boolean
    updateproject(
      projectId: Int!
      updateProjectInput: UpdateProjectInput!
    ): Project!
  }

  type Project {
    id: Int!
    startAt: Date
    endAt: Date
    name: String!
    client: String!
    description: String!
    timing: String
  }

  input ProjectInput {
    name: String!
    client: String!
    description: String!
    timing: String
  }

  input UpdateProjectInput {
    startAt: Date
    endAt: Date
    name: String
    client: String
    description: String
    timing: String
  }
`;

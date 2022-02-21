import { gql } from 'apollo-server';

export default gql`
  scalar Date

  type Query {
    getAllProjects: [Project!]!
    getProjectById(projectId: String!): Project!
    getProjectsByUser: [Project]!
    getProjectRoles: [ProjectRole]!
  }

  type Mutation {
    createProject(projectInput: ProjectInput!): Project!
    deleteProject(projectId: String!): Boolean
    updateProject(
      projectId: String!
      updateProjectInput: UpdateProjectInput!
    ): Project!
    createProjectRole(roleName: String!): ProjectRole!
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

  type ProjectRole {
    id: ID!
    name: String!
  }
`;

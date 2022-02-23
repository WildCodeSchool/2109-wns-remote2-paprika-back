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
    assignUsers(projectId: String!, usersRoles: [UsersRoles]): Boolean
  }

  type Project {
    id: ID!
    startAt: Date
    endAt: Date
    name: String!
    client: String!
    description: String!
    tasks: [Task]
    participants: [UserProject]
  }

  type UserProject {
    user: User
    projectRole: ProjectRole
  }

  type User {
    id: ID!
    email: String!
    lastName: String!
    firstName: String!
    role: RoleSite!
  }

  type ProjectRole {
    id: ID!
    name: String!
  }


  type Task {
    id: ID!
    name: String!
    description: String!
    status: Status!
    priority: Priority!
    projectId: String!
    timing: String
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

  input UsersRoles {
    userId: String!
    roleId: String!
  }
`;

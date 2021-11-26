"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = (0, apollo_server_1.gql) `
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
//# sourceMappingURL=projectSchema.js.map
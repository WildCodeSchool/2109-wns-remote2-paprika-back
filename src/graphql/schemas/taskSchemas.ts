import { gql } from 'apollo-server';

export default gql`
  type Query {
    getAllTasks: [Task!]!
    getTask(taskId: String!): Task!
  }
  type Mutation {
    createTask(TaskInput: TaskInput!): Task!
    deleteTask(taskId: String!): Boolean
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

  input TaskInput {
    name: String!
    description: String!
    projectId: Int!
  }

  enum Status {
    OPEN
    INPROGRESS
    DONE
  }

  enum Priority {
    LOW
    MEDIUM
    HIGH
  }
`;

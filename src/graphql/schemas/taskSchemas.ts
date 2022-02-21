import { gql } from 'apollo-server';

export default gql`
  type Query {
    getAllTasks: [Task!]!
    getTask(taskId: String!): Task!
    getTaskByProject(projectId: String!): [Task]!
  }
  type Mutation {
    createTask(taskInput: TaskInput!): Task!
    deleteTask(taskId: String!): Boolean
    updateTask(updateTaskInput: UpdateTaskInput!): Task!
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
    projectId: String!
  }

  input UpdateTaskInput {
    taskId: String!
    name: String
    description: String
    projectId: String
    status: Status
    priority: Priority
    timing: String
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

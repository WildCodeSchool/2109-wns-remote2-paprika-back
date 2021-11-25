import { PrismaClient } from '.prisma/client';
import { ProjectInput, UpdateProjectInput } from '../types';
import { GraphQLScalarType, Kind } from 'graphql';

const prisma = new PrismaClient();

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  }
});

export default {
  Date: dateScalar,
  Query: {
    getAllProjects: async () => {
      const projects = await prisma.project.findMany();
      return projects;
    },
    getTask: async ({ projectId }: { projectId: number }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: projectId
        }
      });
      return project;
    }
  },

  Mutation: {
    createProject: async ({ input }: { input: ProjectInput }) => {
      return await prisma.project.create({
        data: {
          name: input.name,
          client: input.client,
          description: input.description,
        }
      });
    },
    deleteProject: async ({ projectId }: { projectId: number }) => {
      return await prisma.project.delete({
        where: {
          id: projectId
        }
      });
    },
    updateProject: async ({
      projectId,
      input
    }: {
      projectId: number;
      input: UpdateProjectInput;
    }) => {
      return await prisma.project.update({
        where: {
          id: projectId
        },
        data: {
          startAt: input.startAt,
          endAt: input.endAt,
          name: input.name,
          client: input.client,
          description: input.description,
        }
      });
    }
  }
};

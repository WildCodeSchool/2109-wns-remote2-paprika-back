import { PrismaClient } from '.prisma/client';
import { ProjectInput, UpdateProjectInput } from '../types';
import { GraphQLScalarType, Kind } from 'graphql';

const prisma = new PrismaClient();

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  }
});

export default {
  Date: dateScalar,
  Query: {
    getAllProjects: async () => {
      const projects = await prisma.project.findMany();
      return projects;
    },
    getProject: async (_: any, { projectId }: { projectId: string }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: projectId
        }
      });
      return project;
    }
  },

  Mutation: {
    createProject: async (
      _: any,
      { projectInput }: { projectInput: ProjectInput }
    ) => {
      return await prisma.project.create({
        data: {
          name: projectInput.name,
          client: projectInput.client,
          description: projectInput.description
        }
      });
    },
    deleteProject: async (_: any, { projectId }: { projectId: string }) => {
      const deleted = await prisma.project.delete({
        where: {
          id: projectId
        }
      });
      return !!deleted;
    },
    updateProject: async (
      _: any,
      {
        projectId,
        updateProjectInput
      }: {
        projectId: string;
        updateProjectInput: UpdateProjectInput;
      }
    ) => {
      return await prisma.project.update({
        where: {
          id: projectId
        },
        data: {
          startAt: updateProjectInput.startAt,
          endAt: updateProjectInput.endAt,
          name: updateProjectInput.name || undefined,
          client: updateProjectInput.client || undefined,
          description: updateProjectInput.description || undefined
        }
      });
    }
  }
};

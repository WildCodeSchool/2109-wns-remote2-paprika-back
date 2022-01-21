import { PrismaClient } from '.prisma/client';
import dateScalar from '../scalars';
import { ProjectInput } from '../types';

const prisma = new PrismaClient();

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
        docId,
        name
      }: {
        docId: string;
        name: string;
      }
    ) => {
      return await prisma.project.update({
        where: {
          id: docId
        },
        data: {
          name: name
        }
      });
    }
  }
};

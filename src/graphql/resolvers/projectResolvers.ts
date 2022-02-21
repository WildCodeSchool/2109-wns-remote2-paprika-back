import { PrismaClient } from '.prisma/client';
import dateScalar from '../scalars';
import { ProjectInput, UpdateProjectInput } from '../types';

const prisma = new PrismaClient();

export default {
  Date: dateScalar,
  Query: {
    getAllProjects: async () => {
      const projects = await prisma.project.findMany({
        orderBy: {
          startAt: 'desc'
        }
      });
      return projects;
    },
    getProjectById: async (_: any, { projectId }: { projectId: string }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: projectId
        }
      });
      return project;
    },
    getProjectsByUser: async () => {
      //TODO get auth user
      const userId = '3325c924-3ae5-4507-95c7-819414850f29'; //get user auth
      const userProjects = await prisma.userProject.findMany({
        where: {
          userId: userId
        }
      });

      return userProjects.map(async (userProject) => {
        const project = await prisma.project.findUnique({
          where: { id: userProject.projectId }
        });
        return project;
      });
    },
    getProjectRoles: async () => {
      const roles = await prisma.projectRole.findMany();
      return roles;
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
    },
    createProjectRole: async (_: any, { roleName }: { roleName: string }) => {
      const role = await prisma.projectRole.create({
        data: {
          name: roleName
        }
      });
      return role;
    }
  }
};

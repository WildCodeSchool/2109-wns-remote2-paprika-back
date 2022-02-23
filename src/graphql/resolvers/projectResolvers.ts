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
        },
        include: {
          tasks: true,
          participants: {
            select: {
              user: true,
              projectRole: true
            }
          }
        }
      });
      return projects;
    },
    getProjectById: async (_: any, { projectId }: { projectId: string }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: projectId
        },
        include: {
          tasks: true,
          participants: {
            select: {
              user: true,
              projectRole: true
            }
          }
        }
      });
      return project;
    },
    getProjectsByUser: async () => {
      //TODO get auth user
      const userId = '3325c924-3ae5-4507-95c7-819414850f29'; //get user auth
      const projects = await prisma.project.findMany({
        where: {
          participants: {
            every: {
              userId: userId
            }
          }
        },
        include: {
          tasks: true,
          participants: {
            select: {
              user: true,
              projectRole: true
            }
          }
        }
      });
      return projects;
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
    },
    assignUsers: async (
      _: any,
      {
        projectId,
        usersRoles
      }: {
        projectId: string;
        usersRoles: Array<{ userId: string; roleId: string }>;
      }
    ) => {
      try {
        usersRoles.forEach(async (user) => {
          await prisma.userProject.upsert({
            where: {
              userId_projectId: { userId: user.userId, projectId: projectId }
            },
            update: {
              projectRoleId: user.roleId
            },
            create: {
              userId: user.userId,
              projectRoleId: user.roleId,
              projectId: projectId
            }
          });
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};

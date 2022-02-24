import { PrismaClient } from '.prisma/client';
import dateScalar from '../scalars';
import { ParticipantsInput, ProjectInput, UpdateProjectInput } from '../types';

const prisma = new PrismaClient();

export default {
  Date: dateScalar,
  Query: {
    getAllProjects: async () => {
      const projects = await prisma.project.findMany({
        where: {
          deleted: false
        },
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
          deleted: false,
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
    },
    getProjectRoles: async () => {
      const roles = await prisma.projectRole.findMany();
      return roles;
    }
  },

  Mutation: {
    createProject: async (
      _: any,
      {
        projectInput,
        participantsInput
      }: { projectInput: ProjectInput; participantsInput: ParticipantsInput[] }
    ) => {
      const participants = generateUserRole(participantsInput);

      return await prisma.project.create({
        data: {
          name: projectInput.name,
          client: projectInput.client,
          description: projectInput.description,
          participants: {
            createMany: {
              data: participants
            }
          }
        },
        include: { participants: true }
      });
    },
    deleteProject: async (_: any, { projectId }: { projectId: string }) => {
      const deleted = await prisma.project.update({
        where: {
          id: projectId
        },
        data: {
          deleted: { set: true }
        }
      });
      return !!deleted;
    },
    updateProject: async (
      _: any,
      {
        projectId,
        updateProjectInput,
        participantsInput
      }: {
        projectId: string;
        updateProjectInput: UpdateProjectInput;
        participantsInput: ParticipantsInput[];
      }
    ) => {
      const userRole = generateUserRole(participantsInput);
      const userProject = generateUserProject(participantsInput, projectId);

      const project = await prisma.project.update({
        include: { participants: true },
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

      userRole.forEach(async (user, index) => {
        await prisma.userProject.upsert({
          where: {
            userId_projectId: userProject[index]
          },
          update: {
            projectRoleId: userRole[index].projectRoleId
          },
          create: {
            userId: user.userId,
            projectRoleId: user.projectRoleId,
            projectId: projectId
          }
        });
      });

      return project;
    },
    createProjectRole: async (_: any, { roleName }: { roleName: string }) => {
      const role = await prisma.projectRole.create({
        data: {
          name: roleName
        }
      });
      return role;
    },
    assignUsersToProject: async (
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

const generateUserRole = (participants: ParticipantsInput[]) => {
  return participants.map((user) => ({
    userId: user.userId,
    projectRoleId: user.projectRoleId
  }));
};

const generateUserProject = (
  participants: ParticipantsInput[],
  projectId: string
) => {
  return participants.map((user) => ({
    userId: user.userId,
    projectId: projectId
  }));
};

import { PrismaClient } from '.prisma/client';
import dateScalar from '../scalars';
import {
  ParticipantsInput,
  ProjectInput,
  UpdateProjectInput,
  User
} from '../types';

const prisma = new PrismaClient();

const generateUserRole = (participants: ParticipantsInput[]) => {
  if (participants)
    return participants.map((user) => ({
      userId: user.userId,
      projectRoleId: user.projectRoleId
    }));

  return [];
};

const generateUserProject = (
  participants: ParticipantsInput[],
  projectId: string
) => {
  if (participants)
    return participants.map((user) => ({
      userId: user.userId,
      projectId
    }));

  return [];
};

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
          tasks: {
            include: {
              users: true
            }
          },
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
    getProjectById: async (
      _: undefined,
      { projectId }: { projectId: string }
    ) => {
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
    getProjectsByUser: async (
      _: undefined,
      _args: undefined,
      ctx: { user: User; prisma: PrismaClient }
    ) => {
      const { user } = ctx;
      if (!user) throw new Error("Pas d'utilisateur");
      else if (user.role === 'PO') {
        const projects = prisma.project.findMany({
          where: { deleted: false },
          include: {
            tasks: {
              include: {
                users: true
              }
            },
            participants: {
              select: {
                user: true,
                projectRole: true
              }
            }
          }
        });
        return projects;
      } else {
        const projects = await prisma.project.findMany({
          where: {
            deleted: false,
            participants: {
              every: {
                userId: {
                  equals: user.id
                }
              }
            },
            NOT: {
              participants: {
                none: {}
              }
            }
          },
          include: {
            tasks: {
              include: {
                users: true
              }
            },
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
    getProjectRoles: async () => {
      const roles = await prisma.projectRole.findMany();
      return roles;
    }
  },

  Mutation: {
    createProject: async (
      _: undefined,
      {
        projectInput,
        participantsInput
      }: { projectInput: ProjectInput; participantsInput: ParticipantsInput[] }
    ) => {
      const participants = generateUserRole(participantsInput);

      const project = await prisma.project.create({
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
        include: {
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
    deleteProject: async (
      _: undefined,
      { projectId }: { projectId: string }
    ) => {
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
      _: undefined,
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
            projectId
          }
        });
      });

      return project;
    },
    createProjectRole: async (
      _: undefined,
      { roleName }: { roleName: string }
    ) => {
      const role = await prisma.projectRole.create({
        data: {
          name: roleName
        }
      });
      return role;
    },
    assignUsersToProject: async (
      _: undefined,
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
              userId_projectId: { userId: user.userId, projectId }
            },
            update: {
              projectRoleId: user.roleId
            },
            create: {
              userId: user.userId,
              projectRoleId: user.roleId,
              projectId
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

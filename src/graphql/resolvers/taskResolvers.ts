import { PrismaClient } from '@prisma/client';
import { TaskInput, UpdateTaskInput } from '../types';

const prisma = new PrismaClient();

export default {
  Query: {
    getAllTasks: async () => {
      const tasks = await prisma.task.findMany({
        include:{
          users: true,
        }
      });
      return tasks;
    },
    getTask: async (_: any, { taskId }: { taskId: string }) => {
      const task = await prisma.task.findUnique({
        where: {
          id: taskId
        },
        include:{
          users: true,
        }
      });
      return task;
    },
    getTaskByProject: async (_: any, { projectId }: { projectId: string }) => {
      const tasks = await prisma.task.findMany({
        where: {
          projectId: projectId
        }
      });
      return tasks;
    }
  },

  Mutation: {
    createTask: async (_: any, { taskInput }: { taskInput: TaskInput }) => {
        const idUser: Array<{ id: string }> = taskInput.users.map((userID) => ({
          id: userID
        }));
        const task = await prisma.task.create({
          include: { users: true },
          data: {
            users: {
              connect: idUser
            },
            name: taskInput.name,
            description: taskInput.description,
            projectId: taskInput.projectId
          }
        });
        return task;
    },
    deleteTask: async (_: any, { taskId }: { taskId: string }) => {
      const deletedTask = await prisma.task.delete({
        where: {
          id: taskId
        }
      });
      return deletedTask;
    },
    updateTask: async (
      _: any,
      { updateTaskInput }: { updateTaskInput: UpdateTaskInput }
    ) => {

      const idUser: Array<{ id: string }> = updateTaskInput.users.map((userID) => ({
        id: userID
      }));

      const updatedTask = await prisma.task.update({
        where: {
          id: updateTaskInput.taskId
        },
        include: { users: true },
        data: {
          users: {
            connect: idUser
          },
          name: updateTaskInput.name || undefined,
          description: updateTaskInput.description || undefined,
          status: updateTaskInput.status,
          priority: updateTaskInput.priority,
          timing: updateTaskInput.timing
        }
      });
      return updatedTask;
    }
  }
};

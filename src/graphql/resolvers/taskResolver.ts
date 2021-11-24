import { PrismaClient } from '@prisma/client';
import { TaskInput } from '../types';

const prisma = new PrismaClient();

export default {
  Query: {
    getAllTasks: async () => {
      const tasks = await prisma.task.findMany();
      return tasks;
    }
  },

  Mutation: {
    createTask: async ({input} : {input: TaskInput}) => {
      await prisma.task.create({
        data: {
          name: input.name,
          description: input.description,
          projectId: input.projectId,
        }
      });
    },
    deleteTask: async ({ taskId }: { taskId: number }) => {
      await prisma.task.delete({
        where: {
          id: taskId
        }
      });
    }
  }
};

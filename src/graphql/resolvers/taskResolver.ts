import { PrismaClient } from '@prisma/client';
import { TaskInput, UpdateTaskInput } from '../types';

const prisma = new PrismaClient();

export default {
  Query: {
    getAllTasks: async () => {
      const tasks = await prisma.task.findMany();
      return tasks;
    },
    getTask: async (_: any, { taskId }: { taskId: string }) => {
      const task = await prisma.task.findUnique({
        where: {
          id: taskId
        }
      })
      return task;
    },
  },

  Mutation: {
    createTask: async (_: any, { taskInput }: { taskInput: TaskInput }) => {
      const task = await prisma.task.create({
        data: {
          name: taskInput.name,
          description: taskInput.description,
          projectId: taskInput.projectId,
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
    updateTask: async (_: any, { updateTaskInput }: { updateTaskInput: UpdateTaskInput }) => {
      const updatedTask = await prisma.task.update({
        where: {
          id: updateTaskInput.taskId
        },
        data: {
          name: updateTaskInput.name || undefined,
          description: updateTaskInput.description || undefined,
          status: updateTaskInput.status,
          priority: updateTaskInput.priority,
          timing: updateTaskInput.timing
        }
      })
      return updatedTask;
    }


  }
};


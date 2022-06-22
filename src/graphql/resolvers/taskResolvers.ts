import { PrismaClient } from '@prisma/client';
import { TaskInput, UpdateTaskInput } from '../types';

const prisma = new PrismaClient();

export default {
  Query: {
    getAllTasks: async () => {
      const tasks = await prisma.task.findMany({
        include: {
          users: true
        }
      });
      return tasks;
    },
    getTask: async (_: undefined, { taskId }: { taskId: string }) => {
      const task = await prisma.task.findUnique({
        where: {
          id: taskId
        },
        include: {
          users: true
        }
      });
      return task;
    },
    getTaskByProject: async (
      _: undefined,
      { projectId }: { projectId: string }
    ) => {
      const tasks = await prisma.task.findMany({
        where: {
          projectId
        },
        include: {
          users: true
        }
      });
      return tasks;
    }
  },

  Mutation: {
    createTask: async (
      _: undefined,
      { taskInput }: { taskInput: TaskInput }
    ) => {
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
    deleteTask: async (_: undefined, { taskId }: { taskId: string }) => {
      const deletedTask = await prisma.task.delete({
        where: {
          id: taskId
        }
      });
      return deletedTask;
    },
    updateTask: async (
      _: undefined,
      { updateTaskInput }: { updateTaskInput: UpdateTaskInput }
    ) => {
      const idUsers: Array<{ id: string }> = updateTaskInput.users.map(
        (userID) => ({
          id: userID
        })
      );

      const toAdd: Array<{ id: string }> = [];
      const toDelete: Array<{ id: string }> = [];

      const task = await prisma.task.findUnique({
        where: {
          id: updateTaskInput.taskId
        },
        include: {
          users: true
        }
      });

      /** Verify if the new users'list has new users, if so it adds them to the current list */
      idUsers.forEach((idUser) => {
        if (task?.users) {
          const currentUsers = JSON.stringify(task.users);
          if (!currentUsers.includes(JSON.stringify(idUser))) {
            toAdd.push(idUser);
          }
        }
      });

      /** Verify if the new users'list has missing users compare to the current list,
       * if so it deletes them from the current list */
      task?.users.forEach((user) => {
        if (idUsers) {
          const newUsers = JSON.stringify(idUsers);
          if (!newUsers.includes(JSON.stringify(user.id))) {
            toDelete.push({ id: user.id });
          }
        }
      });

      const updatedTask = await prisma.task.update({
        where: {
          id: updateTaskInput.taskId
        },
        include: { users: true },
        data: {
          users: {
            connect: toAdd,
            disconnect: toDelete
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

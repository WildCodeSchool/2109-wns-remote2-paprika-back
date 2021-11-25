// import { PrismaClient } from '@prisma/client';
// import { TaskInput, UpdateTaskInput } from '../types';

// const prisma = new PrismaClient();

export default {
  // Query: {
  //   getAllTasks: async () => {
  //     const tasks = await prisma.task.findMany();
  //     return tasks;
  //   },
  //   getTask: async ({taskId} : {taskId: number}) => {
  //     const task = await prisma.task.findUnique({
  //       where:{
  //         id: taskId
  //       }
  //     })
  //     return task;
  //   },
  // },

  // Mutation: {
  //   createTask: async ({input} : {input: TaskInput}) => {
  //     await prisma.task.create({
  //       data: {
  //         name: input.name,
  //         description: input.description,
  //         projectId: input.projectId,
  //       }
  //     });
  //   },
  //   deleteTask: async ({ taskId }: { taskId: number }) => {
  //     await prisma.task.delete({
  //       where: {
  //         id: taskId
  //       }
  //     });
  //   },
  //   updateTask: async ({taskId, input} : {taskId: number, input: UpdateTaskInput}) => {
  //     const task = await prisma.task.update({
  //       where:{
  //         id: taskId
  //       },
  //       data: {
  //         status: input.status,
  //         priority: input.priority,
  //         timing: input.timing
  //       }
  //     })
  //   }

  // }
};

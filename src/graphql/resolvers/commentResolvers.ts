import { PrismaClient } from '.prisma/client';
import dateScalar from '../scalars';
import { CommentInput } from '../types';

const prisma = new PrismaClient();

export default {
  Date: dateScalar,

  Query: {
    getCommentsByTask: async (_: any, { taskId }: { taskId: string }) => {
      const comments = await prisma.comment.findMany({
        where: {
          taskId: taskId
        },
        include: { user: true }
      });

      return comments;
    }
  },
  Mutation: {
    createComment: async (
      _: any,
      { commentInput }: { commentInput: CommentInput }
    ) => {
      return await prisma.comment.create({
        data: {
          content: commentInput.content,
          userId: commentInput.userId,
          taskId: commentInput.taskId
        },
        include: { user: true }
      });
    },
    deleteComment: async ({ commentId }: { commentId: string }) => {
      return !!(await prisma.comment.delete({
        where: {
          id: commentId
        }
      }));
    }
  }
};

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
          id: taskId
        }
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
          userId: '0e520791-387c-4748-8d52-af1522d013a3',
          taskId: commentInput.taskId
        }
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

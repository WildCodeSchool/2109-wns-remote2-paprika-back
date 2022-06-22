import { PrismaClient } from '.prisma/client';
import dateScalar from '../scalars';
import { CommentInput, User } from '../types';

const prisma = new PrismaClient();

export default {
  Date: dateScalar,

  Query: {
    getCommentsByTask: async (_: undefined, { taskId }: { taskId: string }) => {
      const comments = await prisma.comment.findMany({
        where: {
          taskId
        },
        include: { user: true }
      });

      return comments;
    }
  },
  Mutation: {
    createComment: async (
      _: undefined,
      { commentInput }: { commentInput: CommentInput },
      ctx: { user: User; prisma: PrismaClient }
    ) => {
      const { user } = ctx;
      return await prisma.comment.create({
        data: {
          content: commentInput.content,
          userId: user.id,
          taskId: commentInput.taskId
        },
        include: { user: true }
      });
    },
    deleteComment: async ({ commentId }: { commentId: string }) =>
      !!(await prisma.comment.delete({
        where: {
          id: commentId
        }
      }))
  }
};

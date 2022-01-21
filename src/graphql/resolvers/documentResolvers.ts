import { PrismaClient } from '@prisma/client';
import dateScalar from '../scalars';

const prisma = new PrismaClient();

export default {
  Date: dateScalar,
  Query: {
    getAllDocumentsByProject: async (_: any, { projectId }: { projectId: string }) => {
      const documents = await prisma.document.findMany({
        where: { projectId: projectId }
      });
      return documents;
    }
  }
};

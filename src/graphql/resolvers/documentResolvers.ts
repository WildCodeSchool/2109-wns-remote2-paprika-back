import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import generateFileName from '../../services/generateFileName';
import dateScalar from '../scalars';
import { DocumentInput } from '../types.d';

const prisma = new PrismaClient();

export default {
  Date: dateScalar,
  Upload: GraphQLUpload,
  Query: {
    getAllDocumentsByProject: async (
      _: undefined,
      { projectId }: { projectId: string }
    ) => {
      const documents = await prisma.document.findMany({
        where: { projectId }
      });
      return documents;
    },
    getDocumentById: async (_: undefined, { docId }: { docId: string }) => {
      const document = await prisma.document.findUnique({
        where: { id: docId }
      });
      return document;
    }
  },
  Mutation: {
    addDocument: async (
      _: undefined,
      {
        documentInput,
        file
      }: { documentInput: DocumentInput; file: FileUpload }
    ) => {
      // save file in uploadedFiles
      const { createReadStream, filename } = await file;
      const fileStream = createReadStream();
      const newFileName = generateFileName(filename);

      fileStream.pipe(
        fs.createWriteStream(`${__dirname}/uploadedFiles/${newFileName}`)
      );

      // insert on db
      const newDocument = await prisma.document.create({
        data: {
          name: documentInput.name,
          fileName: newFileName,
          projectId: documentInput.projectId
        }
      });

      return newDocument;
    },
    deleteDocument: async (_: undefined, { docId }: { docId: string }) => {
      // delete in project
      const fileName = await prisma.document.findUnique({
        where: { id: docId }
      });

      fs.unlinkSync(`${__dirname}/${fileName}`);
      return await prisma.document.delete({
        where: {
          id: docId
        }
      });
    },
    updateDocument: async (
      _: undefined,
      { docId, newName }: { docId: string; newName: string }
    ) =>
      await prisma.project.update({
        where: {
          id: docId
        },
        data: {
          name: newName
        }
      })
  }
};

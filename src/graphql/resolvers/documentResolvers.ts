import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import generateFileName from '../../services/generateFileName';
import dateScalar from '../scalars';
import { DocumentInput } from './../types.d';

const prisma = new PrismaClient();

export default {
  Date: dateScalar,
  Upload: GraphQLUpload,
  Query: {
    getAllDocumentsByProject: async (
      _: any,
      { projectId }: { projectId: string }
    ) => {
      const documents = await prisma.document.findMany({
        where: { projectId: projectId }
      });
      return documents;
    }
  },
  Mutation: {
    addDocument: async (
      _: any,
      {
        documentInput,
        file
      }: { documentInput: DocumentInput; file: FileUpload }
    ) => {
      //save file in uploadedFiles
      const { createReadStream, filename } = await file;
      const fileStream = createReadStream();
      const newFileName = generateFileName(filename);

      fileStream.pipe(
        fs.createWriteStream(`${__dirname}/uploadedFiles/${newFileName}`)
      );

      //insert on db
      const newDocument = await prisma.document.create({
        data: {
          name: documentInput.name,
          fileName: newFileName,
          projectId: documentInput.projectId
        }
      });

      return newDocument;
    }
  }
};

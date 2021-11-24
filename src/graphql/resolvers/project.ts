import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

const getAllProjects = async () => {
  const projects = await prisma.project.findMany();
  return projects;
};

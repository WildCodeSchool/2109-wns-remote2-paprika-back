import { PrismaClient } from '@prisma/client';
import * as faker from 'faker';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  for (let i = 0; i < 5; i++) {
    await prisma.project.create({
      data: {
        name: faker.lorem.word(5),
        description: faker.lorem.sentence(7),
        client: faker.name.findName()
      }
    });
  }
  const projects = await prisma.project.findMany();

  for (let i = 0; i < 5; i++) {
    await prisma.task.create({
      data: {
        name: faker.lorem.word(5),
        description: faker.lorem.sentence(7),
        projectId: projects[i].id
      }
    });

    await prisma.user.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.lorem.word(10),
        avatar: faker.image.avatar(),
        description: faker.lorem.sentence(7),
        work: faker.lorem.word(5)
      }
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

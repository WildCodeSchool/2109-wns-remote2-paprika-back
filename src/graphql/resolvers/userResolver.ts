import * as bcrypt from 'bcryptjs';
import { UserInput } from '../types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default {
    Mutation: {
        register: async (_: any, { userInput }: { userInput: UserInput }) => {
            const hashedPassword = await bcrypt.hash(userInput.password, 10);
            const user = await prisma.user.create({
                data: {
                    password: hashedPassword,
                    email: userInput.email,
                    firstName: userInput.firstName,
                    lastName: userInput.lastName
                }
            })
            return user;
        }
    },
    Query: {}
}
import * as bcrypt from 'bcryptjs';
import { UserInput, LoginUserInput } from '../types';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

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
        },
        login: async (_: any, { loginUserInput }: { loginUserInput: LoginUserInput }) => {
            const user = await prisma.user.findUnique({
                where: {
                    email: loginUserInput.email,
                }
            });
            if (!user) {
                throw new Error('Invalid login')
            };
            const passwordMatch = await bcrypt.compare(loginUserInput.password, user.password);
            if (!passwordMatch) {
                throw new Error('Invalid login')
            }
            const token = jwt.sign({
                id: user.id,
                email: user.email
            },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: '1d'
                }
            );
            return { user, token };
        }
    },
    Query: {
        getAllUsers: async () => {
            const users = await prisma.user.findMany();
            return users;
        },
        getUser: async (_: any, { userId }: { userId: string }) => {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
            return user;
        },
    },
}
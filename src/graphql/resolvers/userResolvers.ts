import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  UpdateUserInput,
  User,
  UserCreateInput,
  UserLoginInput
} from '../types';

const prisma = new PrismaClient();

export default {
  Mutation: {
    register: async (
      _: undefined,
      { userCreateInput }: { userCreateInput: UserCreateInput }
    ) => {
      const newUser = await prisma.user.create({
        data: {
          email: userCreateInput.email,
          firstName: userCreateInput.firstName,
          lastName: userCreateInput.lastName,
          password: bcrypt.hashSync(userCreateInput.password, 3),
          role: userCreateInput.role || undefined
        }
      });
      return { token: jwt.sign(newUser, 'secretKey'), user: newUser };
    },
    login: async (
      _: undefined,
      { userLoginInput }: { userLoginInput: UserLoginInput }
    ) => {
      const loggedUser = await prisma.user.findUnique({
        where: {
          email: userLoginInput.email
        }
      });
      if (!loggedUser) throw new Error('Unable to Login');
      const isMatch = bcrypt.compareSync(
        userLoginInput.password,
        loggedUser.password
      );
      if (!isMatch) throw new Error('Unable to Login');
      return { token: jwt.sign(loggedUser, 'secretKey'), user: loggedUser };
    },
    deleteUser: async (_: undefined, { userId }: { userId: string }) => {
      const deletedUser = await prisma.user.delete({
        where: {
          id: userId
        }
      });
      return !!deletedUser;
    },
    updateUser: async (
      _: undefined,
      { updateUserInput }: { updateUserInput: UpdateUserInput },
      ctx: { user: User; prisma: PrismaClient }
    ) => {
      const updatedUser = await prisma.user.update({
        where: {
          id: ctx !== null ? ctx.user.id : updateUserInput.userId
        },
        data: {
          firstName: updateUserInput.firstName || undefined,
          lastName: updateUserInput.lastName || undefined,
          role: updateUserInput.role || undefined
        }
      });
      return updatedUser;
    }
  },
  Query: {
    getAllUsers: async () => {
      const users = await prisma.user.findMany();
      return users;
    },
    getUser: async (_: undefined, { userId }: { userId: string }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      return user;
    },
    getCurrentUser: async (
      _: undefined,
      _args: undefined,
      context: { user: User; prisma: PrismaClient }
    ) => context.user
  }
};

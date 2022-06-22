import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const getUser = async (authorization: string) => {
  const bearerLength = 'Bearer '.length;
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength);
    const { ok, result } = await new Promise((resolve) =>
      jwt.verify(token, 'secretKey', (err, results) => {
        if (err) {
          resolve({
            ok: false,
            result: err
          });
        } else {
          resolve({
            ok: true,
            result: results
          });
        }
      })
    );

    if (ok) {
      const user = await prisma.user.findUnique({
        where: {
          id: result.id
        }
      });
      return user;
    }
    console.error(result);
    return null;
  }

  return null;
};

export default getUser;

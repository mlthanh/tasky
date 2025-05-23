import { inferAsyncReturnType, TRPCError } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { verify } from 'jsonwebtoken';
import { authConfig } from '../configs/auth.config';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export interface User {
  email: string;
  role: 'user' | 'admin';
}

async function decodeAndVerifyJwtToken(token: string): Promise<User> {
  const decoded = verify(token, authConfig.secretKey);
  return decoded as User;
}

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const refreshToken = req.cookies['refresh_token'];

  let user: User | undefined;

  if (req.headers.authorization) {
    try {
      user = await decodeAndVerifyJwtToken(
        req.headers.authorization.split(' ')[1]
      );
    } catch (err) {
      throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
    }
  }

  if (!user && refreshToken) {
    try {
      user = await decodeAndVerifyJwtToken(refreshToken);
    } catch {
      throw new TRPCError({
        message: 'Invalid refresh token',
        code: 'UNAUTHORIZED',
      });
    }
  }
  return { req, res, prisma, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;

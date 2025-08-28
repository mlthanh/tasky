import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { verify } from 'jsonwebtoken';
import { authConfig } from '../configs/auth.config';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export interface User {
  email: string;
  role: 'user' | 'admin';
  id: number;
}

function decodeJwtToken(token: string): User | null {
  try {
    const decoded = verify(token, authConfig.tokenKey);
    return decoded as User;
  } catch {
    return null;
  }
}

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const authHeader = req.headers.authorization;
  let user: User | undefined;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = decodeJwtToken(token);
    console.log('user', decoded);
    if (decoded) user = decoded;
  }

  return { req, res, prisma, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;

import { AuthType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { SignInDto, SignUpDto } from './auth.dtos';
import { sign, verify } from 'jsonwebtoken';
import { authConfig } from '../../configs/auth.config';
import { hash, compare } from 'bcryptjs';
import { Context } from '../../server/context';

type UserResponse = {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  role: string;
  authType: AuthType;
};

type SignUpResult = UserResponse & { accessToken: string };

export const signUp = async (
  input: SignUpDto,
  ctx: Context
): Promise<UserResponse> => {
  const existingUser = await ctx.prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Email already in use',
    });
  }

  const bcryptHash = await hash(input.password, 10);
  const generateUsername = 'user' + Math.random().toString(36).substring(2, 8);

  const user = await ctx.prisma.user.create({
    data: {
      email: input.email,
      password: bcryptHash,
      role: 'user',
      name: generateUsername,
    },
  });
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    role: user.role,
    authType: user.authType,
  };
};

export const signIn = async (
  input: SignInDto,
  ctx: Context
): Promise<SignUpResult> => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  const error = new TRPCError({
    message: 'Incorrect email or password',
    code: 'UNAUTHORIZED',
  });

  if (!user) {
    throw error;
  }

  const result = await compare(input.password, user.password);

  if (!result) {
    throw error;
  }

  const accessToken = sign(
    {
      id: user.id,
      role: user.role,
    },
    authConfig.secretKey,
    { expiresIn: authConfig.jwtExpiresIn }
  );

  const refreshToken = sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
    },
    authConfig.refreshToken,
    { expiresIn: authConfig.refreshExpiresIn }
  );

  ctx.res.setCookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    name: user.name,
    role: user.role,
    authType: user.authType,
    accessToken,
  };
};

export const refreshToken = async (ctx: Context) => {
  const refreshToken = ctx.req.cookies?.['refresh_token'];

  if (!refreshToken) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'No refresh token' });
  }

  try {
    const payload = verify(refreshToken, authConfig.refreshToken) as {
      name: string;
      role: string;
      email: string;
    };

    const accessToken = sign(
      { username: payload.name, role: payload.role },
      authConfig.secretKey,
      { expiresIn: authConfig.refreshExpiresIn }
    );

    return {
      accessToken,
      username: payload.name,
      email: payload.email,
      role: payload.role,
    };
  } catch (error) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Invalid refresh token',
    });
  }
};

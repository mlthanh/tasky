import { TRPCError } from '@trpc/server';
import {
  SignInDto,
  SignUpDto,
  UserResponseSchema
} from '@shared/schemas/auth.schema';
import { sign, verify } from 'jsonwebtoken';
import { authConfig } from '@backend/configs/auth.config';
import { hash, compare } from 'bcryptjs';
import { Context } from '@backend/server/context';
import { UserResponse, SignInResponse } from '@shared/types/auth.type';

export const signUp = async (
  input: SignUpDto,
  ctx: Context
): Promise<UserResponse> => {
  const existingUser = await ctx.prisma.user.findUnique({
    where: { email: input.email }
  });

  if (existingUser) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Email already in use'
    });
  }

  const bcryptHash = await hash(input.password, 10);
  const generatedUsername = 'user' + Math.random().toString(36).substring(2, 8);

  const user = await ctx.prisma.user.create({
    data: {
      email: input.email,
      password: bcryptHash,
      role: 'user',
      name: generatedUsername
    }
  });
  return UserResponseSchema.parse({
    id: user.id,
    email: user.email,
    name: user.name ?? user.email,
    role: user.role
  });
};

export const signIn = async (
  input: SignInDto,
  ctx: Context
): Promise<SignInResponse> => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      email: input.email
    }
  });

  const UNAUTHORIZED_error = new TRPCError({
    message: 'Incorrect email or password',
    code: 'UNAUTHORIZED'
  });

  if (!user || !user.password) {
    throw UNAUTHORIZED_error;
  }

  const result = await compare(input.password, user.password);

  if (!result) {
    throw UNAUTHORIZED_error;
  }

  const accessToken = sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    authConfig.tokenKey,
    { expiresIn: authConfig.tokenExpiresIn }
  );

  const refreshToken = sign(
    {
      id: user.id,
      role: user.role,
      email: user.email
    },
    authConfig.refreshTokenKey,
    { expiresIn: authConfig.refreshExpiresIn }
  );

  ctx.res.setCookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return UserResponseSchema.parse({
    id: user.id,
    email: user.email,
    name: user.name ?? user.email,
    role: user.role,
    accessToken
  });
};

export const refreshToken = async (ctx: Context) => {
  const refreshToken = ctx.req.cookies?.['refresh_token'];

  if (!refreshToken) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'No refresh token' });
  }

  try {
    const payload = verify(
      refreshToken,
      authConfig.refreshTokenKey
    ) as SignInResponse;

    const accessToken = sign(
      { email: payload.email, id: payload.id },
      authConfig.tokenKey,
      { expiresIn: authConfig.tokenExpiresIn }
    );

    return { ...payload, accessToken };
  } catch (error) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Invalid refresh token'
    });
  }
};

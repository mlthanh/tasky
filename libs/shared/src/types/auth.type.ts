import { AuthType } from '@prisma/client';

export type UserResponse = {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  username?: string;
  role: string;
  authType: AuthType;
};

export type SignInResponse = UserResponse & { accessToken: string };

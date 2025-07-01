import { AuthType } from '@prisma/client';

export type UserResponse = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export type SignInResponse = UserResponse & { accessToken: string };

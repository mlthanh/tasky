export type UserResponse = {
  email: string;
  name: string;
  role: string;
  avatar: string | null;
};

export type SignInResponse = UserResponse & { accessToken: string };

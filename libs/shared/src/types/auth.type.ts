export type UserResponse = {
  email: string;
  name: string;
  role: string;
};

export type SignInResponse = UserResponse & { accessToken: string };

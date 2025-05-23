import { create } from 'zustand';

export type User = {
  name?: string;
  email: string;
  role: string;
  accessToken: string;
};

type UserStore = {
  user?: User;
  signIn: (user: User) => void;
  signOut: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  signIn: (user) => set({ user }),
  signOut: () => set({ user: undefined }),
}));

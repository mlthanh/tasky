import { create } from 'zustand';

export type User = {
  username: string;
  role: string;
  avatarUrl: string;
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

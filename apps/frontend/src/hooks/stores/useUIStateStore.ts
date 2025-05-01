import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UIState = {
  isTimerOpen: boolean;
  isGoalOpen: boolean;
  background: string;

  setIsTimerOpen: (v: boolean) => void;
  setIsGoalOpen: (v: boolean) => void;
  setBackground: (img: string) => void;
};

export const useUIStateStore = create<UIState>()(
  persist(
    (set) => ({
      isTimerOpen: false,
      isGoalOpen: false,
      background: '/study/anime1.jpg',
      setIsTimerOpen: (v: boolean) => set(() => ({ isTimerOpen: v })),
      setIsGoalOpen: (v: boolean) => set(() => ({ isGoalOpen: v })),
      setBackground: (img: string) => set(() => ({ background: img })),
    }),
    {
      name: 'UI-state-storage',
      partialize: (state) => ({
        isTimerOpen: state.isTimerOpen,
        isGoalOpen: state.isGoalOpen,
        background: state.background,
      }),
    }
  )
);

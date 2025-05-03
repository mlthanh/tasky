import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UIState = {
  isTimerOpen: boolean;
  isGoalOpen: boolean;
  isQuoteShow: boolean;
  background: string;
  quote: { quote: any; author: any } | undefined;

  setIsTimerOpen: (v: boolean) => void;
  setIsGoalOpen: (v: boolean) => void;
  setIsQuoteShow: (v: boolean) => void;
  setBackground: (img: string) => void;
  setQuote: (q: { quote: any; author: any } | undefined) => void;
};

export const useUIStateStore = create<UIState>()(
  persist(
    (set) => ({
      isTimerOpen: false,
      isGoalOpen: false,
      isQuoteShow: false,
      background: '/study/anime1.jpg',
      quote: { quote: '', author: '' },
      setIsTimerOpen: (v: boolean) => set(() => ({ isTimerOpen: v })),
      setIsGoalOpen: (v: boolean) => set(() => ({ isGoalOpen: v })),
      setIsQuoteShow: (v: boolean) => set(() => ({ isQuoteShow: v })),
      setBackground: (img: string) => set(() => ({ background: img })),
      setQuote: (q: { quote: any; author: any } | undefined) =>
        set(() => ({ quote: q })),
    }),
    {
      name: 'UI-state-storage',
      partialize: (state) => ({
        isTimerOpen: state.isTimerOpen,
        isGoalOpen: state.isGoalOpen,
        isQuoteShow: state.isQuoteShow,
        background: state.background,
        quote: state.quote,
      }),
    }
  )
);

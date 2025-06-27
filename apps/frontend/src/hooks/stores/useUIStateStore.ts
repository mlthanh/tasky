import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UIState = {
  isTimerOpen: boolean;
  isTimerDetail: boolean;
  isGoalOpen: boolean;
  isQuoteShow: boolean;
  background: string;
  quote: { quote: string; author: string } | undefined;

  setIsTimerOpen: (v: boolean) => void;
  setIsTimerDetail: (v: boolean) => void;
  setIsGoalOpen: (v: boolean) => void;
  setIsQuoteShow: (v: boolean) => void;
  setBackground: (img: string) => void;
  setQuote: (q: { quote: string; author: string } | undefined) => void;
};

export const useUIStateStore = create<UIState>()(
  persist(
    (set) => ({
      isTimerOpen: false,
      isTimerDetail: false,
      isGoalOpen: false,
      isQuoteShow: false,
      background: '/study/anime1.jpg',
      quote: { quote: '', author: '' },

      setIsTimerOpen: (v: boolean) => set(() => ({ isTimerOpen: v })),
      setIsTimerDetail: (v: boolean) => set(() => ({ isTimerDetail: v })),
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
        isTimerDetail: state.isTimerDetail,
        background: state.background,
        quote: state.quote,
      }),
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UIState = {
  isTimerOpen: boolean;
  isTimerDetail: boolean;
  isGoalOpen: boolean;
  isQuoteShow: boolean;
  isWorkspaceModelOpen: boolean;
  background: string;
  videoVolume: number;
  quote: { quote: string; author: string } | undefined;

  setIsTimerOpen: (v: boolean) => void;
  setIsTimerDetail: (v: boolean) => void;
  setIsGoalOpen: (v: boolean) => void;
  setIsQuoteShow: (v: boolean) => void;
  setIsWorkspaceModelOpen: (v: boolean) => void;

  setBackground: (img: string) => void;
  setVolume: (volumn: number) => void;

  setQuote: (q: { quote: string; author: string } | undefined) => void;
};

export const useUIStateStore = create<UIState>()(
  persist(
    (set) => ({
      isTimerOpen: false,
      isTimerDetail: false,
      isGoalOpen: false,
      isQuoteShow: false,
      isWorkspaceModelOpen: false,
      background: '/focus/anime1.jpg',
      videoVolume: 0,
      quote: { quote: '', author: '' },

      setIsTimerOpen: (v: boolean) => set(() => ({ isTimerOpen: v })),
      setIsTimerDetail: (v: boolean) => set(() => ({ isTimerDetail: v })),
      setIsGoalOpen: (v: boolean) => set(() => ({ isGoalOpen: v })),
      setIsQuoteShow: (v: boolean) => set(() => ({ isQuoteShow: v })),
      setIsWorkspaceModelOpen: (v: boolean) =>
        set(() => ({ isWorkspaceModelOpen: v })),
      setBackground: (img: string) => set(() => ({ background: img })),
      setVolume: (volume: number) => set(() => ({ videoVolume: volume })),
      setQuote: (q: { quote: string; author: string } | undefined) =>
        set(() => ({ quote: q }))
    }),
    {
      name: 'UI-state-storage',
      partialize: (state) => ({
        isTimerOpen: state.isTimerOpen,
        isGoalOpen: state.isGoalOpen,
        isQuoteShow: state.isQuoteShow,
        isTimerDetail: state.isTimerDetail,
        background: state.background,
        quote: state.quote
      })
    }
  )
);

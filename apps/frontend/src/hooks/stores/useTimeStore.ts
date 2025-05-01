import { create } from 'zustand';

export type TimeStore = {
  fTime: number;
  bTime: number;

  setfocusTime: (ftime: number) => void;
  setbreakTime: (btime: number) => void;
};

export const useTimeStore = create<TimeStore>()((set) => ({
  fTime: 25 * 60,
  bTime: 5 * 60,
  setfocusTime: (time) => set({ fTime: time }),
  setbreakTime: (time) => set({ bTime: time }),
}));

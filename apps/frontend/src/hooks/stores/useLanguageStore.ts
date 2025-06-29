import { Language } from '@frontend/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LanguageState = {
  language: Language;

  setLanguage: (v: Language) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',

      setLanguage: (v: Language) => set(() => ({ language: v }))
    }),
    {
      name: 'Language',
      partialize: (state) => ({
        language: state.language
      })
    }
  )
);

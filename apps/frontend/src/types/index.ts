type Theme = 'light' | 'dark';

export const LANGUAGES = {
  en: 'English',
  vn: 'Tiếng Việt'
} as const;

export type Language = keyof typeof LANGUAGES;

export type { Theme };

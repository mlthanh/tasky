import {
  FlagForUnitedKingdom,
  FlagForVietnam
} from '@frontend/components/common/Icon';

type Theme = 'light' | 'dark';

export const LANGUAGES = {
  en: {
    label: 'English',
    icon: FlagForUnitedKingdom
  },
  vn: {
    label: 'Tiếng Việt',
    icon: FlagForVietnam
  }
};

export type Language = keyof typeof LANGUAGES;

export type { Theme };

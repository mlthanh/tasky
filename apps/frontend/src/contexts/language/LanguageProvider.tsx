import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Language } from '../../types/index';

import en from './data/en.json';
import vn from './data/vn.json';

type LanguageContextType = {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  getLabel: (labelId: string) => string;
};

const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType
);

interface LanguageProps {
  children: ReactNode;
  language: Language;
}

export function LanguageProvider({ children, language }: LanguageProps) {
  const [currentLanguage, setLanguage] = useState<Language>(language);

  const changeLanguage = (language: Language) => {
    if (language === 'en') {
      setLanguage('en');
      window.localStorage.setItem('lang', 'en');
    } else {
      setLanguage('vn');
      window.localStorage.setItem('lang', 'vn');
    }
  };

  useEffect(() => {
    const localLang = window.localStorage.getItem('lang') as Language | null;

    if (localLang) {
      setLanguage(localLang);
    }
  }, []);

  const labelsDictionary: { [key: string]: { [key: string]: string } } = {
    en,
    vn,
  };

  const getLabel = (labelId: string) => {
    const label = labelsDictionary[currentLanguage][labelId];
    if (!label)
      throw new Error(
        `LabelID ${labelId} not found in ${currentLanguage}.json`
      );
    return label;
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, changeLanguage, getLabel }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Theme } from '../types/index';

type themeContextType = {
  CurrentTheme: Theme;
  ChangeTheme: () => void;
};

const ThemeContext = createContext<themeContextType>({} as themeContextType);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [CurrentTheme, setTheme] = useState<Theme>('light');

  const ChangeTheme = () => {
    if (CurrentTheme === 'light') {
      setTheme('dark');
      window.localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      window.localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as Theme | null;

    if (localTheme) {
      setTheme(localTheme);

      if (localTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ CurrentTheme, ChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

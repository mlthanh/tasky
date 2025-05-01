import { useTheme } from '@contexts/ThemeProvider';
import { SunIcon, MoonIcon } from '@common/Icon';

export default function ThemeToggler() {
  const { CurrentTheme, ChangeTheme } = useTheme();
  return (
    <button
      className="flex items-center justify-center w-6 h-6 p-1 ml-3 rounded-full ease light-mode dark:dark-mode"
      onClick={ChangeTheme}
    >
      {CurrentTheme === 'light' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

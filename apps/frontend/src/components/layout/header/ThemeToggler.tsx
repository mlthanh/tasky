import { useTheme } from '@contexts/ThemeProvider';
import { SunIcon, MoonIcon } from '@components/common/Icon';

export default function ThemeToggler() {
  const { CurrentTheme, ChangeTheme } = useTheme();
  return (
    <button
      className="flex items-center justify-center p-1 ml-3 rounded-full size-7 ease light-mode dark:dark-mode"
      onClick={() => ChangeTheme()}
    >
      {CurrentTheme === 'light' ? (
        <MoonIcon className="size-5" />
      ) : (
        <SunIcon className="size-5" />
      )}
    </button>
  );
}

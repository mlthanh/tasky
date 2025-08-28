import { useTheme } from '@contexts/ThemeProvider';
import { SunIcon, MoonIcon } from '@components/common/Icon';

export default function ThemeToggler() {
  const { CurrentTheme, ChangeTheme } = useTheme();
  return (
    <button onClick={() => ChangeTheme()}>
      {CurrentTheme === 'light' ? (
        <MoonIcon className="size-5" />
      ) : (
        <SunIcon className="size-5" />
      )}
    </button>
  );
}

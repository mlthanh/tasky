import {
  BlockQuote,
  Contract,
  ImageIcon,
  MusicFill,
  OpenInFullRounded,
} from '@common/Icon';
import { MenuStatus } from '@components/study/OverlayMenus/OverlayMenus';

export const getToolList = ({
  isFullscreen,
  toggleFullscreen,
  setMenuState,
}: {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  setMenuState: React.Dispatch<React.SetStateAction<MenuStatus | null>>;
}) => [
  {
    title: 'Background',
    icon: ImageIcon,
    handler: () =>
      setMenuState((prev) =>
        prev === MenuStatus.BACKGROUND ? null : MenuStatus.BACKGROUND
      ),
  },
  {
    title: 'Music',
    icon: MusicFill,
    handler: () =>
      setMenuState((prev) =>
        prev === MenuStatus.MUSIC ? null : MenuStatus.MUSIC
      ),
  },
  {
    title: 'Quote',
    icon: BlockQuote,
    handler: () =>
      setMenuState((prev) =>
        prev === MenuStatus.QUOTE ? null : MenuStatus.QUOTE
      ),
  },
  {
    title: 'Expanded',
    icon: !isFullscreen ? OpenInFullRounded : Contract,
    handler: toggleFullscreen,
  },
];

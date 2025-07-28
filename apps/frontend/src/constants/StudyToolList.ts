import {
  BlockQuote,
  Contract,
  ImageIcon,
  MusicFill,
  OpenInFullRounded
} from '@components/common/Icon';
import { MenuStatus } from '@frontend/components/page/study/OverlayMenus/OverlayMenus';
import { useDeviceStore } from '@hooks/stores';

export const GetToolList = ({
  isFullscreen,
  toggleFullscreen,
  setMenuState
}: {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  setMenuState: React.Dispatch<React.SetStateAction<MenuStatus | null>>;
}) => {
  const { isMobile } = useDeviceStore();
  const ToolList = [
    {
      title: 'Background',
      icon: ImageIcon,
      handler: () =>
        setMenuState((prev) =>
          prev === MenuStatus.BACKGROUND ? null : MenuStatus.BACKGROUND
        )
    },
    {
      title: 'Music',
      icon: MusicFill,
      handler: () =>
        setMenuState((prev) =>
          prev === MenuStatus.MUSIC ? null : MenuStatus.MUSIC
        )
    },
    {
      title: 'Quote',
      icon: BlockQuote,
      handler: () =>
        setMenuState((prev) =>
          prev === MenuStatus.QUOTE ? null : MenuStatus.QUOTE
        )
    },
    {
      title: 'Expanded',
      icon: !isFullscreen ? OpenInFullRounded : Contract,
      handler: toggleFullscreen
    }
  ];

  const ToolListM = [
    {
      title: 'Background',
      icon: ImageIcon,
      handler: () =>
        setMenuState((prev) =>
          prev === MenuStatus.BACKGROUND ? null : MenuStatus.BACKGROUND
        )
    },
    {
      title: 'Music',
      icon: MusicFill,
      handler: () =>
        setMenuState((prev) =>
          prev === MenuStatus.MUSIC ? null : MenuStatus.MUSIC
        )
    }
  ];
  return !isMobile ? ToolList : ToolListM;
};

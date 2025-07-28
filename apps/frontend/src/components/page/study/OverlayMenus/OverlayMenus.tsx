import { BackgroundPicker } from '@frontend/components/page/study/OverlayMenus/BackgroundPicker/BackgroundPicker';
import { MusicSetting } from '@frontend/components/page/study/OverlayMenus/MusicSetting/MusicSetting';
import { QuotesSession } from '@frontend/components/page/study/OverlayMenus/QuotesSession/QuotesSession';

export enum MenuStatus {
  BACKGROUND = 'BACKGROUND',
  MUSIC = 'MUSIC',
  QUOTE = 'QUOTE'
}

interface OverlayMenusProps {
  menuState: MenuStatus | null;
  onClose: () => void;
}

export const OverlayMenus = ({ menuState, onClose }: OverlayMenusProps) => {
  return (
    <div className="z-[999]">
      <BackgroundPicker
        className={`px-3 py-2 text-sm bg-black/85 lg:px-4 lg:py-3 ${
          menuState !== MenuStatus.BACKGROUND ? 'hidden' : ''
        }`}
        closeHandler={onClose}
      />
      <MusicSetting
        className={`px-3 py-2 text-sm bg-black/85 lg:px-4 lg:py-3 ${
          menuState !== MenuStatus.MUSIC ? 'hidden' : ''
        }`}
        closeHandler={onClose}
      />
      <QuotesSession
        className={`px-3 py-2 text-sm bg-black/85 lg:px-4 lg:py-3 ${
          menuState !== MenuStatus.QUOTE ? 'hidden' : ''
        }`}
        closeHandler={onClose}
      />
    </div>
  );
};

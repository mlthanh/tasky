import { BackgroundPicker } from '@components/study/OverlayMenus/BackgroundPicker/BackgroundPicker';
import { MusicSetting } from '@components/study/OverlayMenus/MusicSetting/MusicSetting';
import { QuotesSession } from '@components/study/OverlayMenus/QuotesSession/QuotesSession';

export enum MenuStatus {
  BACKGROUND = 'BACKGROUND',
  MUSIC = 'MUSIC',
  QUOTE = 'QUOTE',
}

interface OverlayMenusProps {
  menuState: MenuStatus | null;
  onClose: () => void;
}

export const OverlayMenus = ({ menuState, onClose }: OverlayMenusProps) => {
  return (
    <div className="z-[999] sm:relative absolute">
      <BackgroundPicker
        className={`px-3 py-2 text-sm bg-black/85 xl:p-7 lg:p-5 ${
          menuState !== MenuStatus.BACKGROUND ? 'hidden' : ''
        }`}
        closeHandler={onClose}
      />
      <MusicSetting
        className={`px-3 py-2 text-sm bg-black/85 xl:p-7 lg:p-5 ${
          menuState !== MenuStatus.MUSIC ? 'hidden' : ''
        }`}
        closeHandler={onClose}
      />
      <QuotesSession
        className={`px-3 py-2 text-sm bg-black/85 xl:p-7 lg:p-5 ${
          menuState !== MenuStatus.QUOTE ? 'hidden' : ''
        }`}
        closeHandler={onClose}
      />
    </div>
  );
};

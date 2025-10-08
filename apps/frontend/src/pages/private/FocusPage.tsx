import { useEffect, useRef, useState } from 'react';
import { useUIStateStore, useTimeStore } from '@hooks/stores';
import { useSidebar } from '@components/common/SideBar';
import ToolPanel from '@frontend/components/page/focus/ToolPanel';
import {
  OverlayMenus,
  MenuStatus
} from '@frontend/components/page/focus/OverlayMenus/OverlayMenus';
import SessionPanel from '@frontend/components/page/focus/SessionPanel/SessionPanel';
import { QuickStatusPanel } from '@frontend/components/page/focus/QuickStatusPanel';
import { useFullscreen } from '@hooks/useFullScreen';
import { GetToolList } from '@frontend/constants/FocusToolList';
import { QuotePanel } from '@frontend/components/page/focus/QuotePanel';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import YouTubeBG from '@frontend/components/page/focus/YoutubeBackground';

const FocusPage = () => {
  const { setOpen } = useSidebar();
  const contentRef = useRef<HTMLDivElement>(null);

  const { background, videoVolume } = useUIStateStore();
  const { fTime, bTime } = useTimeStore();
  const { toggleFullscreen, isFullscreen } = useFullscreen(contentRef);

  const [menuState, setMenuState] = useState<MenuStatus | null>(null);
  const timer = usePomodoroTimer({ focusTime: fTime, breakTime: bTime });

  const getYouTubeVideoId = (link?: string) => {
    if (!link) return null;
    const match = link.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(background);

  useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div
      className="relative w-full h-screen px-app"
      ref={contentRef}
      style={{
        backgroundImage:
          background && !videoId ? `url(${background})` : undefined,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      {videoId && <YouTubeBG videoId={videoId} volume={videoVolume} />}

      <div className="flex items-center justify-between pt-5">
        <QuickStatusPanel timer={timer} />
        <ToolPanel
          toolList={GetToolList({
            isFullscreen,
            toggleFullscreen,
            setMenuState
          })}
          className="flex items-center justify-center gap-2"
          toolContentStyle="text-light-mode"
        />
      </div>

      <div className="flex justify-between mt-[20px] max-h-[calc(100vh-100px)]">
        <SessionPanel timer={timer} />
        <QuotePanel />
        <OverlayMenus
          menuState={menuState}
          onClose={() => setMenuState(null)}
        />
      </div>
    </div>
  );
};

export default FocusPage;

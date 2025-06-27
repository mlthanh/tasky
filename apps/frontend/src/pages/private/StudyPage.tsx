import { useEffect, useRef, useState } from 'react';
import { useUIStateStore, useTimeStore } from '@hooks/stores';
import { useSidebar } from '@components/common/SideBar';
import ToolPanel from '@components/study/ToolPanel';
import {
  OverlayMenus,
  MenuStatus
} from '@components/study/OverlayMenus/OverlayMenus';
import SessionPanel from '@components/study/SessionPanel/SessionPanel';
import { QuickStatusPanel } from '@components/study/QuickStatusPanel';
import { useFullscreen } from '@hooks/useFullScreen';
import { GetToolList } from '@constants/StudyToolList';
import { QuotePanel } from '@components/study/QuotePanel';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';

const StudyPage = () => {
  const { setOpen } = useSidebar();
  const contentRef = useRef<HTMLDivElement>(null);

  const { background } = useUIStateStore();
  const { fTime, bTime } = useTimeStore();
  const { toggleFullscreen, isFullscreen } = useFullscreen(contentRef);

  const [menuState, setMenuState] = useState<MenuStatus | null>(null);
  const timer = usePomodoroTimer({ focusTime: fTime, breakTime: bTime });

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div
      className="w-full h-screen px-app"
      style={{
        backgroundImage: background ? `url(${background})` : undefined,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
      ref={contentRef}
    >
      <div className="flex items-center justify-between pt-5">
        <QuickStatusPanel timer={timer} />
        <ToolPanel
          toolList={GetToolList({
            isFullscreen,
            toggleFullscreen,
            setMenuState
          })}
          className="flex items-center justify-center gap-2"
        />
      </div>

      <div className="flex justify-between mt-[20px] max-h-[calc(100vh-100px)]">
        <SessionPanel
          className="xl:w-[20vw] sm:w-[38vw] md:w-[32vw] lg:w-[25vw] h-full"
          timer={timer}
        />
        <QuotePanel className="hidden md:block" />
        <OverlayMenus
          menuState={menuState}
          onClose={() => {
            setMenuState(null);
          }}
        />
      </div>
    </div>
  );
};

export default StudyPage;

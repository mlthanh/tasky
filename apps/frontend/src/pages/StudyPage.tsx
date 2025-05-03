import { useEffect, useRef, useState } from 'react';
import { useSidebar } from '@common/SideBar';
import ToolPanel from '@components/study/ToolPanel';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { OverlayMenus } from '@components/study/OverlayMenus/OverlayMenus';
import { MenuStatus } from '@components/study/OverlayMenus/OverlayMenus';
import SessionPanel from '@components/study/SessionPanel/SessionPanel';
import { QuickStatusPanel } from '@components/study/QuickStatusPanel';
import { useFullscreen } from '@hooks/useFullScreen';
import { getToolList } from '@constants/StudyToolList';
import { QuotePanel } from '@components/study/QuotePanel';

const StudyPage = () => {
  const { setOpen } = useSidebar();
  const contentRef = useRef<HTMLDivElement>(null);

  const { isQuoteShow, quote, background } = useUIStateStore();
  const { toggleFullscreen, isFullscreen } = useFullscreen(contentRef);

  const [menuState, setMenuState] = useState<MenuStatus | null>(null);

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div
      className="w-full h-screen px-app"
      style={{
        backgroundImage: background ? `url(${background})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      ref={contentRef}
    >
      <div className="flex items-center justify-between pt-5">
        <QuickStatusPanel />
        <ToolPanel
          toolList={getToolList({
            isFullscreen,
            toggleFullscreen,
            setMenuState,
          })}
          className="flex items-center justify-center gap-2"
        />
      </div>

      <div className="flex justify-between mt-[20px]">
        <SessionPanel />
        <QuotePanel />
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

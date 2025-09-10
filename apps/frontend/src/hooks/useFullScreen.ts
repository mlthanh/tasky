import { useToast } from '@frontend/contexts/ToastProvider';
import { useEffect, useState } from 'react';

export const useFullscreen = (ref: React.RefObject<HTMLElement | null>) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { showToastError } = useToast();

  const toggleFullscreen = () => {
    const elem = ref.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem
        .requestFullscreen()
        .catch((err) => showToastError(`Something was wrong: ${err}`));
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return { isFullscreen, toggleFullscreen };
};

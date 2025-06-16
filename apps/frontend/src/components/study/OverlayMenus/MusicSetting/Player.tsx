import { Label } from '@components/common/Label';
import Slider from '@components/common/Slider';
import { ReactNode, useEffect, useRef } from 'react';

type PlayerProps = {
  className?: string;
  title?: string;
  icon?: ReactNode;
  volume: number;
  setVolumn: (value: number) => void;
  source: string;
  audioRefs?: (ref: HTMLAudioElement | null) => void;
};

export const Player = ({
  className,
  volume,
  setVolumn,
  title,
  source,
  audioRefs,
}: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;

    if (volume === 0) {
      audio.pause();
    } else {
      if (audio.paused) {
        audio.play().catch((err) => console.log('Play failed:', err));
      }
    }
  }, [volume]);

  return (
    <div className={`${className} w-full flex-col gap-1`}>
      <Label>{title}</Label>
      <audio
        loop
        src={source}
        ref={(el) => {
          audioRef.current = el;
          if (audioRefs) audioRefs(el);
        }}
      ></audio>
      <Slider value={volume} onChange={setVolumn} />
    </div>
  );
};

import { Card, CardContent, CardHeader } from '@components/common/Card';
import { Label } from '@components/common/Label';
import { MusicFill, RoundClose, Pause, Play } from '@components/common/Icon';
import { useRef, useState } from 'react';
import StudyToolbar from '../../StudyToolbar';
import { Player } from './Player';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

type MusicSettingProps = {
  className?: string;
  closeHandler: () => void;
};

export const MusicSetting = ({
  className,
  closeHandler
}: MusicSettingProps) => {
  const [rainVolumn, setRainVolumn] = useState<number>(0);
  const [fireVolumn, setFireVolumn] = useState<number>(0);
  const [ghibliVolumn, setGhibliVolumn] = useState<number>(0);
  const [ambienceVolumn, setAmbienceVolumn] = useState<number>(0);
  const [isPause, setIsPaused] = useState(false);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const { getLabel } = useLanguage();

  const soundSettingList = [
    {
      id: '1',
      title: getLabel('lbl_study_010'),
      volume: rainVolumn,
      setVolume: setRainVolumn,
      source: '/study/music/calming-rain.mp3'
    },
    {
      id: '2',
      title: getLabel('lbl_study_011'),
      volume: ghibliVolumn,
      setVolume: setGhibliVolumn,
      source: '/study/music/ghibli.mp3'
    },
    {
      id: '3',
      title: getLabel('lbl_study_012'),
      volume: fireVolumn,
      setVolume: setFireVolumn,
      source: '/study/music/fire.mp3'
    },
    {
      id: '4',
      title: getLabel('lbl_study_013'),
      volume: ambienceVolumn,
      setVolume: setAmbienceVolumn,
      source: '/study/music/ambience.mp3'
    }
  ];

  const toolBarList = [
    {
      title: isPause ? 'play' : 'pause',
      icon: isPause ? (
        <Play className="w-2 h-2" />
      ) : (
        <Pause className="w-2 h-2" />
      ),
      handler: () => {
        if (isPause) {
          Object.values(audioRefs.current).forEach((audio) => {
            if (audio && audio.paused) {
              audio.play().catch((err) => console.log('Play failed:', err));
            }
          });
          setIsPaused(false);
        } else {
          Object.values(audioRefs.current).forEach((audio) => {
            if (audio) {
              audio.pause();
            }
          });
          setIsPaused(true);
        }
      }
    },
    {
      title: 'close',
      icon: <RoundClose />,
      handler: closeHandler
    }
  ];

  return (
    <Card className={`${className}`}>
      <CardHeader className="flex justify-between gap-10">
        <div className="flex items-center justify-center gap-1">
          <Label className="text-white" icon={<MusicFill />}>
            {getLabel('lbl_study_008')}
          </Label>
        </div>
        <StudyToolbar toolBarList={toolBarList}></StudyToolbar>
      </CardHeader>
      <CardContent
        className={`flex-col gap-3 mt-5 ${
          isPause ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {soundSettingList.map((sound) => (
          <Player
            className="text-white"
            key={sound.id}
            volume={sound.volume}
            setVolumn={sound.setVolume}
            source={sound.source}
            title={sound.title}
            audioRefs={(el) => {
              audioRefs.current[sound.id] = el;
            }}
          />
        ))}
      </CardContent>
    </Card>
  );
};

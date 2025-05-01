import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@common/Card';
import {
  BlockQuote,
  Goal24,
  ImageIcon,
  MusicFill,
  OpenInFullRounded,
  ReadingTimeDuotone,
} from '@common/Icon';
import { Label } from '@common/Label';
import { useSidebar } from '@common/SideBar';
import { TimerCounter } from '@components/study/PersonalTimer/TimerCounter';
import StudyToolbar from '@components/study/StudyMenu';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import TimerSession from '@components/study/PersonalTimer/TimerSession';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { useTimeStore } from '@hooks/stores/useTimeStore';
import { GoalSession } from '@components/study/GoalSession/GoalSession';
import { TaskStatus, useTaskStore } from '@hooks/stores/useTaskStore';
import { BackgroundPicker } from '@components/study/BackgroundPicker/BackgroundPicker';
import { MusicSetting } from '@components/study/MusicSetting/MusicSetting';

const StudyPage = () => {
  const { setOpen } = useSidebar();

  const { isTimerOpen, isGoalOpen, setIsTimerOpen, setIsGoalOpen, background } =
    useUIStateStore();
  const { fTime, bTime } = useTimeStore();
  const timer = usePomodoroTimer({ focusTime: fTime, breakTime: bTime });
  const { taskList } = useTaskStore();

  enum menuStatus {
    BACKGROUND = 'BACKGROUND',
    MUSIC = 'MUSIC',
    QUOTE = 'QUOTE',
  }
  const [menuState, setMenuState] = useState<menuStatus | null>(null);

  const completedTask = taskList.filter(
    (task) => task.status === TaskStatus.COMPLETED
  ).length;

  const openTask = taskList.filter(
    (task) => task.status === TaskStatus.OPEN
  ).length;

  useEffect(() => {
    setOpen(false);
  }, []);

  const toolList = [
    {
      title: 'Background',
      icon: <ImageIcon />,
      handler: () => {
        setMenuState((prev) =>
          prev === menuStatus.BACKGROUND ? null : menuStatus.BACKGROUND
        );
      },
    },
    {
      title: 'Music',
      icon: <MusicFill />,
      handler: () => {
        setMenuState((prev) =>
          prev === menuStatus.MUSIC ? null : menuStatus.MUSIC
        );
      },
    },
    {
      title: 'Quote',
      icon: <BlockQuote />,
      handler: () =>
        setMenuState((prev) =>
          prev === menuStatus.QUOTE ? null : menuStatus.QUOTE
        ),
    },
    {
      title: 'Expanded',
      icon: <OpenInFullRounded />,
    },
  ];

  const toggleTimerSetting = () => setIsTimerOpen(!isTimerOpen);
  const toggleGoalSetting = () => setIsGoalOpen(!isGoalOpen);

  return (
    <div
      className="w-full h-screen px-app"
      style={{
        backgroundImage: background ? `url(${background})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex items-center justify-between pt-5">
        <div className="flex items-center justify-center gap-2 text-white">
          <Card
            className="px-3 py-2 cursor-pointer bg-black/85"
            onClick={toggleTimerSetting}
          >
            <CardHeader>
              <div className="flex items-center gap-1">
                <Label
                  className="text-xs text-white"
                  icon={<ReadingTimeDuotone />}
                >
                  Personal Timer
                </Label>
              </div>
            </CardHeader>
            <CardContent>
              <TimerCounter timer={timer} className="text-xs font-semibold" />
            </CardContent>
          </Card>

          <Card
            className="flex flex-col items-center justify-center px-3 py-2 cursor-pointer bg-black/85"
            onClick={toggleGoalSetting}
          >
            <CardHeader>
              <Label className="text-xs text-white" icon={<Goal24 />}>
                Goal Sessions
              </Label>
            </CardHeader>
            <CardContent className="text-xs font-semibold">
              <span className="font-bold">{completedTask}</span>/{openTask}
            </CardContent>
          </Card>
        </div>

        <StudyToolbar
          toolList={toolList}
          className="flex items-center justify-center gap-2"
        />
      </div>

      <div className="flex justify-between mt-[20px]">
        <div className="w-[20vw] h-[80vh] flex flex-col gap-2">
          <TimerSession
            className={`px-3 py-2 text-sm bg-black/85 xl:p-7 lg:p-5 ${
              isTimerOpen ? 'hidden' : ''
            }`}
            timer={timer}
          />
          <GoalSession
            className={`px-3 py-2 text-sm bg-black/85 xl:p-7 lg:p-5 ${
              isGoalOpen ? 'hidden' : ''
            }`}
          />
        </div>
        <div className="">
          <BackgroundPicker
            className={`px-3 py-2 text-sm bg-black/85 xl:p-7 lg:p-5 ${
              menuState !== menuStatus.BACKGROUND ? 'hidden' : ''
            }`}
            closeHandler={() => {
              setMenuState(null);
            }}
          />
          <MusicSetting
            className={`px-3 py-2 text-sm bg-black/85 xl:p-7 lg:p-5 ${
              menuState !== menuStatus.MUSIC ? 'hidden' : ''
            }`}
            closeHandler={() => {
              setMenuState(null);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudyPage;

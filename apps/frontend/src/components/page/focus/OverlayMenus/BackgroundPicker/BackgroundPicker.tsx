import { Card, CardContent, CardHeader } from '@components/common/Card';
import { Label } from '@components/common/Label';
import {
  ImageIcon,
  LinkSolid,
  RoundClose,
  YoutubeFilled
} from '@components/common/Icon';
import { BackgroundList } from './BackgroundList';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import FocusToolbar from '../../FocusToolbar';
import Input from '@frontend/components/common/Input';
import { useUIStateStore } from '@frontend/hooks/stores';
import Slider from '@frontend/components/common/Slider';

type BackgroundPickerProps = {
  className?: string;
  backgroundList?: string;
  closeHandler: () => void;
};

export const BackgroundPicker = ({
  className,
  closeHandler
}: BackgroundPickerProps) => {
  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose />,
      handler: closeHandler
    }
  ];

  const { getLabel } = useLanguage();
  const { setBackground, videoVolume, setVolume } = useUIStateStore();

  return (
    <Card className={`${className}`}>
      <CardHeader className="flex justify-between">
        <div className="flex items-center justify-center gap-1">
          <Label className="font-bold text-white" icon={<ImageIcon />}>
            {getLabel('lbl_focus_007')}
          </Label>
        </div>
        <FocusToolbar toolBarList={toolBarList}></FocusToolbar>
      </CardHeader>
      <CardContent className="flex flex-col">
        <BackgroundList />
        <div className="flex flex-col justify-between w-full my-5">
          <Label
            className="font-bold text-white"
            icon={<YoutubeFilled className="text-red size-5" />}
          >
            Youtube Video
          </Label>
          <Input
            className="mt-2 text-light-mode"
            placeholder="Paste a youtube link here"
            leftIcon={<LinkSolid className="text-light-mode" />}
            onPaste={(e) => {
              const pastedData = e.clipboardData.getData('Text');
              setBackground(pastedData);
            }}
          />

          <Slider
            value={videoVolume}
            onChange={setVolume}
            className="mt-5"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </CardContent>
    </Card>
  );
};

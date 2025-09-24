import { Card, CardContent, CardHeader } from '@components/common/Card';
import { Label } from '@components/common/Label';
import { ImageIcon, RoundClose, YoutubeFilled } from '@components/common/Icon';
import { BackgroundList } from './BackgroundList';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import FocusToolbar from '../../FocusToolbar';

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
        <div className="flex justify-between w-full my-5">
          <Label
            className="font-bold text-white"
            icon={<YoutubeFilled className="text-red size-5" />}
          >
            Youtube video
          </Label>
          <span>.</span>
        </div>
      </CardContent>
    </Card>
  );
};

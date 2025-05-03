import { Card, CardContent, CardFooter, CardHeader } from '@common/Card';
import { Label } from '@common/Label';
import StudyToolbar from '../../StudyToolbar';
import { ImageIcon, RoundClose } from '@common/Icon';
import { BackgroundList } from './BackgroundList';

type BackgroundPickerProps = {
  className?: string;
  backgroundList?: string;
  closeHandler: () => void;
};

export const BackgroundPicker = ({
  className,
  closeHandler,
}: BackgroundPickerProps) => {
  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose />,
      handler: closeHandler,
    },
  ];

  return (
    <Card className={`${className}`}>
      <CardHeader className="flex justify-between">
        <div className="flex items-center justify-center gap-1">
          <Label className="text-white" icon={<ImageIcon />}>
            Background
          </Label>
        </div>
        <StudyToolbar toolBarList={toolBarList}></StudyToolbar>
      </CardHeader>
      <CardContent>
        <BackgroundList />
      </CardContent>
    </Card>
  );
};

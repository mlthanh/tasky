import { Card, CardContent, CardHeader } from '@components/common/Card';
import { Label } from '@components/common/Label';
import StudyToolbar from '../../StudyToolbar';
import { ImageIcon, RoundClose } from '@components/common/Icon';
import { BackgroundList } from './BackgroundList';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

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
          <Label className="text-white" icon={<ImageIcon />}>
            {getLabel('lbl_study_007')}
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

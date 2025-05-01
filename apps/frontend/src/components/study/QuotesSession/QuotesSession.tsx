import { Card, CardContent, CardHeader } from '@common/Card';
import { BlockQuote, RoundClose } from '@common/Icon';
import { Label } from '@common/Label';
import StudyToolbar from '../StudyToolbar';

type QuotesSessionProps = {
  className?: string | null;
  closeHandler: () => void;
};

export const QuotesSession = ({
  className,
  closeHandler,
}: QuotesSessionProps) => {
  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose />,
      handler: closeHandler,
    },
  ];
  return (
    <Card className={`${className}`}>
      <CardHeader className="flex justify-between gap-10">
        <div className="flex items-center justify-center gap-1">
          <Label className="text-white" icon={<BlockQuote />}>
            Motivational Quotes
          </Label>
        </div>
        <StudyToolbar toolBarList={toolBarList}></StudyToolbar>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Label className="text-white" icon={<BlockQuote />}>
          Shuffle
        </Label>
        <Label className="text-white" icon={<BlockQuote />}>
          Hide
        </Label>
      </CardContent>
    </Card>
  );
};

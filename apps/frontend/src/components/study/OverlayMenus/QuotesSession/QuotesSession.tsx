import { Card, CardContent, CardHeader } from '@common/Card';
import { BlockQuote, RoundClose, Show, Shuffle } from '@common/Icon';
import { Label } from '@common/Label';
import StudyToolbar from '../../StudyToolbar';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { trpc } from '@utils/trpc';

type QuotesSessionProps = {
  className?: string | null;
  closeHandler: () => void;
};

export const QuotesSession = ({
  className,
  closeHandler,
}: QuotesSessionProps) => {
  const { isQuoteShow, setIsQuoteShow, quote, setQuote } = useUIStateStore();
  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose />,
      handler: closeHandler,
    },
  ];

  const {
    data: quoteData,
    refetch,
    isFetching,
  } = trpc.quote.getRandomQuote.useQuery(undefined, {
    enabled: false,
  });

  const shuffleHandler = async () => {
    const result = await refetch();
    if (result.data) {
      setQuote(result.data);
    }
  };

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
      <CardContent className="flex flex-col items-start justify-start gap-2 mt-2">
        <div onClick={() => shuffleHandler()}>
          <Label
            className="text-white cursor-pointer hover:opacity-65"
            icon={<Shuffle />}
          >
            Shuffle
          </Label>
        </div>
        <div onClick={() => setIsQuoteShow(!isQuoteShow)}>
          <Label
            className="text-white cursor-pointer hover:opacity-65"
            icon={<Show />}
          >
            Show/Hide
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

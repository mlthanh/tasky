import { Card, CardContent, CardHeader } from '@components/common/Card';
import { BlockQuote, RoundClose, Show, Shuffle } from '@components/common/Icon';
import { Label } from '@components/common/Label';
import FocusToolbar from '@frontend/components/page/focus/FocusToolbar';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { trpc } from '@utils/trpc';

type QuotesSessionProps = {
  className?: string | null;
  closeHandler: () => void;
};

export const QuotesSession = ({
  className,
  closeHandler
}: QuotesSessionProps) => {
  const { isQuoteShow, setIsQuoteShow, setQuote } = useUIStateStore();
  const { getLabel } = useLanguage();
  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose />,
      handler: closeHandler
    }
  ];

  const { refetch } = trpc.quote.getRandomQuote.useQuery(undefined, {
    enabled: false
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
            {getLabel('lbl_focus_009')}
          </Label>
        </div>
        <FocusToolbar toolBarList={toolBarList}></FocusToolbar>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-start gap-2 mt-2">
        <div onClick={() => shuffleHandler()}>
          <Label
            className="text-white cursor-pointer hover:opacity-65"
            icon={<Shuffle />}
          >
            {getLabel('lbl_focus_014')}
          </Label>
        </div>
        <div
          onClick={() => {
            setIsQuoteShow(!isQuoteShow);
          }}
        >
          <Label
            className="text-white cursor-pointer hover:opacity-65"
            icon={<Show />}
          >
            {getLabel('lbl_focus_015')}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

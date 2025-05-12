import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { tailwindMerge } from '@utils/merge';

interface QuotePanelProps {
  className?: string;
}
export const QuotePanel = ({ className }: QuotePanelProps) => {
  const { isQuoteShow, quote } = useUIStateStore();

  if (!isQuoteShow) return null;

  return (
    <div
      className={tailwindMerge(
        'sm:w-[300px] lg:w-[500px] absolute  right-0 px-3 py-2 xl:p-7 lg:p-5 ',
        className
      )}
    >
      <blockquote className="lg:text-2xl font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        "{quote?.quote}"
      </blockquote>
      <cite className="text-white">- {quote?.author}</cite>
    </div>
  );
};

import { tailwindMerge } from '@utils/merge';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <span
      className={tailwindMerge(
        'text-[36px] leading-[52px] font-Jost font-bold underline',
        className
      )}
    >
      task
      <span className="text-primary">y</span>.
    </span>
  );
}

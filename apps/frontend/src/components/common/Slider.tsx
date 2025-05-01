import { tailwindMerge } from '@utils/merge';

type CustomSliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
}: CustomSliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <input
      type="range"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className={tailwindMerge(
        'w-full h-1.5 appearance-none cursor-pointer bg-transparent',
        // track style
        '[&::-webkit-slider-runnable-track]:h-1.5',
        '[&::-webkit-slider-runnable-track]:rounded-full',
        '[&::-moz-range-track]:h-1.5',
        '[&::-moz-range-track]:rounded-full',

        // thumb style
        '[&::-webkit-slider-thumb]:appearance-none',
        '[&::-webkit-slider-thumb]:h-3',
        '[&::-webkit-slider-thumb]:w-3',
        '[&::-webkit-slider-thumb]:mt-[-3px]',
        '[&::-webkit-slider-thumb]:rounded-full',
        '[&::-webkit-slider-thumb]:bg-primary',
        '[&::-webkit-slider-thumb]:border',
        '[&::-webkit-slider-thumb]:border-black',
        '[&::-webkit-slider-thumb]:shadow',

        '[&::-moz-range-thumb]:appearance-none',
        '[&::-moz-range-thumb]:h-3',
        '[&::-moz-range-thumb]:w-3',
        '[&::-moz-range-thumb]:rounded-full',
        '[&::-moz-range-thumb]:bg-primary',
        '[&::-moz-range-thumb]:border',
        '[&::-moz-range-thumb]:border-black',
        '[&::-moz-range-thumb]:shadow',

        className
      )}
      style={{
        background: `linear-gradient(to right, #00ADB5 ${percent}%, white ${percent}%)`,
        borderRadius: '9999px',
      }}
    />
  );
}

import React, { useState, useRef, SVGProps, useEffect } from 'react';
import {
  BaselineCircle,
  BaselineKeyboardArrowDown
} from '@components/common/Icon';
import { tailwindMerge } from '@frontend/utils/merge';

type Option<T> = {
  value: T;
  label: string;
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
};

type SelectProps<T> = {
  options: Option<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  showLabel?: boolean;
};

export function Select<T extends string | number>({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  showLabel = true,
  className
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (v: T) => {
    onChange(v);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <button
        className={tailwindMerge(
          'flex items-center justify-between rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none',
          className
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          {selectedOption?.icon && <selectedOption.icon className="size-5" />}
          {showLabel && (selectedOption?.label || placeholder)}
        </div>
        <BaselineKeyboardArrowDown
          className={tailwindMerge(
            'size-4 opacity-50 transition-transform duration-200 ml-1',
            open ? '-rotate-180' : 'rotate-0'
          )}
        />
      </button>

      {open && (
        <ul className="absolute right-0 z-10 mt-1 overflow-auto bg-white border rounded-md shadow max-h-60 min-w-40">
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              className={tailwindMerge(
                'flex cursor-pointer items-center justify-between px-3 py-2 text-sm dark:hover:bg-slate-700 hover:bg-slate-100',
                opt.value === value ? 'bg-accent text-accent-foreground' : '',
                className
              )}
              onClick={() => handleSelect(opt.value)}
            >
              <div className="flex items-center gap-2">
                {opt.icon && <opt.icon className="size-4" />}
                {opt.label}
              </div>
              {opt.value === value && (
                <BaselineCircle className="size-2 text-primary" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

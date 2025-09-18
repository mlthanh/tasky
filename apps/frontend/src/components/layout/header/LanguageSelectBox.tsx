import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@frontend/components/common/Select';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import { Language, LANGUAGES } from '@frontend/types';
import { SVGProps } from 'react';

type Option = {
  value: string;
  label: string;
};

export const LanguageSelectBox = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const languageOptions: Option[] = (
    Object.entries(LANGUAGES) as [
      Language,
      { label: string; icon: React.ComponentType<SVGProps<SVGSVGElement>> }
    ][]
  ).map(([value, { label }]) => ({
    value,
    label
  }));

  const selectedOption = languageOptions.find(
    (opt) => opt.value === currentLanguage
  );

  return (
    <Select
      value={selectedOption}
      onChange={(opt) => changeLanguage(opt.value as Language)}
      placeholder="Choose language"
    >
      <SelectTrigger className="w-full border-none light-mode dark:dark-mode">
        <SelectValue
          renderValue={(opt) => {
            if (!opt) return <span>?</span>;
            const Icon = LANGUAGES[opt.value as Language].icon;
            return <Icon className="size-5" />;
          }}
        />
      </SelectTrigger>
      <SelectContent className="w-[140px]">
        {languageOptions.map((opt) => {
          const Icon = LANGUAGES[opt.value as Language].icon;
          return (
            <SelectItem key={opt.value} value={opt.value}>
              <div className="flex items-center gap-2">
                <Icon className="size-4" />
                {opt.label}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

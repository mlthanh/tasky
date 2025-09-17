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

export const LanguageSelectBox = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const languageOptions = (
    Object.entries(LANGUAGES) as [
      Language,
      { label: string; icon: React.ComponentType<SVGProps<SVGSVGElement>> }
    ][]
  ).map(([value, { label, icon }]) => ({
    value,
    label,
    icon
  }));

  return (
    <Select value={currentLanguage} onChange={changeLanguage}>
      <SelectTrigger className="w-full border-none light-mode dark:dark-mode">
        <SelectValue
          renderValue={(val) => {
            const opt = languageOptions.find((o) => o.value === val);
            return opt ? <opt.icon className="size-5" /> : '?';
          }}
        />
      </SelectTrigger>
      <SelectContent className="w-[140px]">
        {languageOptions.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            <div className="flex items-center gap-2">
              <opt.icon className="size-4" />
              {opt.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

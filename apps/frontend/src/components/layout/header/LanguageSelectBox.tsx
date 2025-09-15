import { Select } from '@frontend/components/common/Select';
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
    <Select
      value={currentLanguage}
      onChange={changeLanguage}
      options={languageOptions}
      className="border-none light-mode dark:dark-mode"
      showLabel={false}
    />
  );
};

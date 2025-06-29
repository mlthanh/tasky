import { Select } from '@frontend/components/common/Select';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import { Language, LANGUAGES } from '@frontend/types';

export const LanguageSelectBox = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const languageOptions: { value: Language; label: string }[] = (
    Object.entries(LANGUAGES) as [Language, string][]
  ).map(([value, label]) => ({
    value,
    label
  }));

  return (
    <Select
      value={currentLanguage}
      onChange={changeLanguage}
      options={languageOptions}
      className="light-mode dark:dark-mode"
    />
  );
};

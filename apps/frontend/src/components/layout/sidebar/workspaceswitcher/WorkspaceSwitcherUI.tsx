import { BaselineAddCircle } from '@frontend/components/common/Icon';
import { Select } from '@frontend/components/common/Select';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

const WorkspaceSwitcherUI = ({ data }) => {
  const { getLabel } = useLanguage();
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between w-full">
        <span>{getLabel('grp_main_002')}</span>
        <BaselineAddCircle className="size-5" />
      </div>
    </div>
  );
};

export default WorkspaceSwitcherUI;

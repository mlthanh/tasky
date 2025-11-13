import { BaselineAddCircle } from '@frontend/components/common/Icon';
import {
  Select,
  SelectTrigger,
  SelectValue
} from '@frontend/components/common/Select';
import { WorkspaceAvatar } from '@frontend/components/page/workspace/WorkspaceAvatar';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

const WorkspaceSkeleton = ({ msg = 'loading...', isDisable = false }) => {
  const { getLabel } = useLanguage();

  return (
    <div className="flex flex-col w-full gap-y-2">
      <div className="flex items-center justify-between w-full uppercase">
        <span>{getLabel('grp_main_002')}</span>
        <BaselineAddCircle className="size-5" />
      </div>
      <Select>
        <SelectTrigger
          disabled={isDisable}
          className="w-full p-3 font-medium bg-neutral-200"
        >
          <SelectValue
            placeholder={
              <div className="flex items-center gap-3 font-medium">
                <WorkspaceAvatar name="" className="rounded-md" />
                {msg}
              </div>
            }
          />
        </SelectTrigger>
      </Select>
    </div>
  );
};

export default WorkspaceSkeleton;

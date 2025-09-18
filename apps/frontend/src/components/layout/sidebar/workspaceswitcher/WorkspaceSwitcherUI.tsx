import { BaselineAddCircle } from '@frontend/components/common/Icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@frontend/components/common/Select';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

const WorkspaceSwitcherUI = ({ workspaces }) => {
  const { getLabel } = useLanguage();

  return (
    <div className="flex flex-col w-full gap-y-2">
      <div className="flex items-center justify-between w-full uppercase">
        <span>{getLabel('grp_main_002')}</span>
        <BaselineAddCircle className="size-5" />
      </div>
      <Select>
        <SelectTrigger className="w-full p-3 font-medium bg-neutral-200">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              {workspace.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcherUI;

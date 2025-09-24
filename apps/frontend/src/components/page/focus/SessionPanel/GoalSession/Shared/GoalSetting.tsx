import { useTaskStore } from '@hooks/stores/useTaskStore';
import { useState } from 'react';
import { TaskStatus } from '@hooks/stores/useTaskStore';
import { Label } from '@components/common/Label';
import Input from '@components/common/Input';
import { Button } from '@components/common/Button';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import { tailwindMerge } from '@frontend/utils/merge';

type GoalSettingProps = {
  className?: string;
};

const GoalSetting = ({ className }: GoalSettingProps) => {
  const { addTask, taskList } = useTaskStore();
  const [inputValue, setInputValue] = useState('');
  const { getLabel } = useLanguage();

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    const newTask = {
      id: crypto.randomUUID(),
      status: TaskStatus.OPEN,
      content: inputValue.trim(),
      date: new Date()
    };

    addTask(newTask);
    setInputValue('');
  };

  return (
    <div
      className={tailwindMerge(
        'flex flex-col items-center justify-center w-full gap-2',
        className
      )}
    >
      <div className="flex justify-between w-full gap-4">
        <Input
          type="text"
          className="h-10 text-black lg:text-white sm:text-sm"
          placeholder="Type a goal"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? handleAdd() : '')}
        ></Input>
        <Button
          type="submit"
          variant={`${inputValue === '' ? 'muted' : 'default'}`}
          className={'border-none'}
          onClick={handleAdd}
        >
          +
        </Button>
      </div>

      <div className="flex justify-between w-full p-4 bg-black rounded-lg">
        <div className="flex flex-col items-center justify-center gap-1">
          <Label className="font-semibold sm:text-2xl">
            {taskList.filter((task) => task.status === TaskStatus.OPEN).length}
          </Label>
          <Label className="font-bold lg:text-lg sm:text-sm">
            {getLabel('lbl_focus_005')}
          </Label>
        </div>
        <span className="text-3xl">|</span>
        <div className="flex flex-col items-center justify-center gap-1 font-extrabold text-primary">
          <Label className="font-semibold sm:text-2xl">
            {
              taskList.filter((task) => task.status === TaskStatus.COMPLETED)
                .length
            }
          </Label>
          <Label className="font-extrabold lg:text-lg sm:text-sm">
            {getLabel('lbl_focus_006')}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default GoalSetting;

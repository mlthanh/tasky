import { useTaskStore } from '@hooks/stores/useTaskStore';
import { useState } from 'react';
import { TaskStatus } from '@hooks/stores/useTaskStore';
import { Label } from '@components/common/Label';
import Input from '@components/common/Input';
import { Button } from '@components/common/Button';

type GoalSettingProps = {
  className?: string;
};

const GoalSetting = ({ className }: GoalSettingProps) => {
  const { addTask, taskList } = useTaskStore();
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    const newTask = {
      id: crypto.randomUUID(),
      status: TaskStatus.OPEN,
      content: inputValue.trim(),
      date: new Date(),
    };

    addTask(newTask);
    setInputValue('');
  };

  return (
    <div className={`${className}`}>
      <div className="flex justify-between w-full gap-4">
        <Input
          type="text"
          className="text-black sm:text-sm"
          placeholder="Type a goal"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></Input>
        <Button
          type="submit"
          className={`bg-primary ${
            inputValue === '' ? 'bg-gray-400 cursor-default hover:' : ''
          }`}
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
          <Label className=" lg:text-lg sm:text-sm">Open</Label>
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
            Completed
          </Label>
        </div>
      </div>
    </div>
  );
};

export default GoalSetting;

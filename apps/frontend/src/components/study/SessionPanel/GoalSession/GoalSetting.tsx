import { useTaskStore } from '@hooks/stores/useTaskStore';
import { useState } from 'react';
import { TaskStatus } from '@hooks/stores/useTaskStore';
import { Label } from '@common/Label';
import Input from '@common/Input';
import { Button } from '@common/Button';

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
          className=""
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
        <div className="flex flex-col items-center justify-center">
          <Label className="text-2xl">
            {taskList.filter((task) => task.status === TaskStatus.OPEN).length}
          </Label>
          <Label>Open</Label>
        </div>
        <span className="text-3xl">|</span>
        <div className="flex flex-col items-center justify-center font-extrabold text-primary">
          <Label className="text-2xl font-extrabold">
            {
              taskList.filter((task) => task.status === TaskStatus.COMPLETED)
                .length
            }
          </Label>
          <Label className="font-extrabold">Completed</Label>
        </div>
      </div>
    </div>
  );
};

export default GoalSetting;

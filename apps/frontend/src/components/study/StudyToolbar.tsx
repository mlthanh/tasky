import { Button } from '@common/Button';
import { ReactNode } from 'react';

type ToolBarItem = {
  icon: ReactNode;
  title: string;
  handler?: () => void;
};

type StudyToolbarProps = {
  toolBarList: ToolBarItem[];
};

const StudyToolbar = ({ toolBarList }: StudyToolbarProps) => {
  return (
    <div className="flex gap-1">
      {toolBarList.map((item) => (
        <Button
          key={item.title}
          onClick={item.handler}
          className="w-4 h-4 text-black shadow-none sm:text-white"
        >
          {item.icon}
        </Button>
      ))}
    </div>
  );
};

export default StudyToolbar;

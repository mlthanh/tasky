import { Button } from '@components/common/Button';
import { ReactNode } from 'react';

type ToolBarItem = {
  icon: ReactNode;
  title: string;
  handler?: () => void;
};

type FocusToolbarProps = {
  toolBarList: ToolBarItem[];
};

const FocusToolbar = ({ toolBarList }: FocusToolbarProps) => {
  return (
    <div className="flex gap-1">
      {toolBarList.map((item) => (
        <Button
          key={item.title}
          onClick={item.handler}
          variant={'ghost'}
          size={'icon'}
          className="text-white"
        >
          {item.icon}
        </Button>
      ))}
    </div>
  );
};

export default FocusToolbar;

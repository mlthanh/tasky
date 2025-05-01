import { Card, CardContent } from '@common/Card';
import {
  BlockQuote,
  ImageIcon,
  MusicFill,
  OpenInFullRounded,
} from '@common/Icon';
import { TooltipContent, TooltipRoot, TooltipTrigger } from '@common/Tooltip';
import { ReactNode } from 'react';

type toolItemType = {
  title: string;
  icon?: ReactNode;
  handler?: () => void;
};

type StudyToolbarProps = {
  className?: string;
  toolList: toolItemType[];
};

const StudyMenu = ({ className, toolList }: StudyToolbarProps) => {
  return (
    <div className={className}>
      {toolList.map((tool) => (
        <TooltipRoot>
          <TooltipTrigger>
            <Card
              className="flex items-center justify-center cursor-pointer bg-white/55"
              key={tool.title}
              onClick={tool.handler}
            >
              <CardContent className="p-3">{tool.icon}</CardContent>
            </Card>
          </TooltipTrigger>

          <TooltipContent side="bottom">{tool.title}</TooltipContent>
        </TooltipRoot>
      ))}
    </div>
  );
};

export default StudyMenu;

import { Card, CardContent } from '@common/Card';
import { TooltipContent, TooltipRoot, TooltipTrigger } from '@common/Tooltip';
import { SVGProps } from 'react';

export interface toolItemType {
  title: string;
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  handler?: () => void;
}

type ToolPanelProps = {
  className?: string;
  toolList: toolItemType[];
};

const ToolPanel = ({ className, toolList }: ToolPanelProps) => {
  return (
    <div className={className}>
      {toolList.map((tool) => (
        <TooltipRoot key={tool.title}>
          <TooltipTrigger>
            <Card
              className="flex items-center justify-center cursor-pointer bg-white/55"
              onClick={tool.handler}
            >
              <CardContent className="p-3">
                {tool.icon && <tool.icon />}
              </CardContent>
            </Card>
          </TooltipTrigger>

          <TooltipContent side="bottom">{tool.title}</TooltipContent>
        </TooltipRoot>
      ))}
    </div>
  );
};

export default ToolPanel;

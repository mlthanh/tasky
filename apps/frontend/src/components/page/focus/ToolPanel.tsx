import { Card, CardContent } from '@components/common/Card';
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger
} from '@components/common/Tooltip';
import { tailwindMerge } from '@utils/merge';
import { SVGProps } from 'react';

export interface toolItemType {
  title: string;
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  handler?: () => void;
}

type ToolPanelProps = {
  className?: string;
  toolContentStyle?: string;
  toolItemStyle?: string;
  toolList: toolItemType[];
};

const ToolPanel = ({
  className,
  toolList,
  toolContentStyle,
  toolItemStyle
}: ToolPanelProps) => {
  return (
    <div className={className}>
      {toolList.map((tool) => {
        return (
          <TooltipRoot key={tool.title}>
            <TooltipTrigger>
              <Card
                className={tailwindMerge(
                  'flex items-center justify-center cursor-pointer bg-black hover:opacity-50',
                  toolItemStyle
                )}
                onClick={tool.handler}
              >
                <CardContent className={tailwindMerge('p-4', toolContentStyle)}>
                  {tool.icon && <tool.icon />}
                </CardContent>
              </Card>
            </TooltipTrigger>

            <TooltipContent side="bottom">{tool.title}</TooltipContent>
          </TooltipRoot>
        );
      })}
    </div>
  );
};

export default ToolPanel;

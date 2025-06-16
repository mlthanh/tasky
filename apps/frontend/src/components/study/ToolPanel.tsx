import { Card, CardContent } from '@components/common/Card';
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
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
  classNameIcon?: string;
  classNameButton?: string;
  toolList: toolItemType[];
};

const ToolPanel = ({
  className,
  toolList,
  classNameIcon,
  classNameButton,
}: ToolPanelProps) => {
  return (
    <div className={className}>
      {toolList.map((tool) => (
        <TooltipRoot key={tool.title}>
          <TooltipTrigger>
            <Card
              className={tailwindMerge(
                `flex items-center justify-center cursor-pointer bg-white/55`,
                classNameButton
              )}
              onClick={tool.handler}
            >
              <CardContent className={tailwindMerge(`p-3`, classNameIcon)}>
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

import { ReactNode } from "react";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Slot } from "@radix-ui/react-slot";

export type ButtonTooltipProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | null
      | undefined;

    sideOffset?: number;
    className?: string;
    tooltipClassName?: string;
    asChild?: boolean;
    tooltipContent: ReactNode;
  };

const TooltipButton = ({
  variant,
  className,
  tooltipClassName,
  sideOffset = 4,
  children,
  tooltipContent,
  asChild,
  ...props
}: ButtonTooltipProps) => {
  const Comp = asChild ? Slot : Button;
  return (
    <TooltipProvider>
      <Tooltip sideOffset={sideOffset}>
        <TooltipTrigger asChild>
          <Comp
            {...props}
            className={className}
            variant={!asChild ? variant : "default"}
          >
            {children}
          </Comp>
        </TooltipTrigger>
        <TooltipContent className={tooltipClassName}>
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;

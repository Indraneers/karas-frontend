import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputWithIconProps
extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: React.ReactElement;
    endIcon?: React.ReactElement;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;
    return (
      <div className="relative w-full">
        {StartIcon && (
          <div className="top-1/2 left-3 absolute transform -translate-y-1/2">
            <StartIcon.type
              className={cn('h-[18px] w-[18px]')}
              {...startIcon.props}
            />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'border-[1px] border-primary-foreground bg-white h-full flex font-body text-primary-foreground w-full rounded-md bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-normal placeholder:text-primary-foreground placeholder:font-normal placeholder:font-body placeholder:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            startIcon ? 'pl-10' : '',
            endIcon ? 'pr-10' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <div className="top-1/2 right-3 absolute transform -translate-y-1/2">
            <EndIcon.type
              className={cn('h-[18px] w-[18px]')}
              {...endIcon.props}
            />
          </div>
        )}
      </div>
    );
  }
);
InputWithIcon.displayName = 'InputWithIcon';

export { InputWithIcon };

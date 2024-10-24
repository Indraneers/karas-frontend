import * as React from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";

import DarkArrowDown from '@/assets/DarkArrowDown.svg';
import WhiteArrowDown from '@/assets/WhiteArrowDown.svg';
import GreenArrowDown from '@/assets/green-arrow-down.svg';

import { cn } from "@/lib/utils";

interface CustomSelectVariant 
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>  {
  arrowColor?: 'green' | 'white' | 'black';
  arrowClassName?: string;
  border?: boolean;
}

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  CustomSelectVariant
>(({ className, children, arrowClassName = '', arrowColor = 'black', border = false, ...props }, ref) => {
  let arrowComponent: React.ReactNode;

  switch (arrowColor) {
  case 'green':
    arrowComponent = (
      <div className={"grid rounded w-3 h-3 " + arrowClassName}>
        <img
          className="w-full h-full"
          src={GreenArrowDown}
        />
      </div>
    );
    break;
  case 'black':
    arrowComponent = (
      <div className={"place-content-center grid border rounded w-3 h-3 " + arrowClassName}>
        <img
          className="w-full h-full"
          src={DarkArrowDown}
        />
      </div>
    );
    break;
  case 'white':
    arrowComponent = (
      <div className={"place-content-center grid border rounded w-3 h-3 " + arrowClassName}>
        <img
          className="w-full h-full"
          src={WhiteArrowDown}
        />
      </div>
    );
    break;
  default:
    arrowComponent = (
      <div className={"place-content-center grid border rounded w-3 h-3 " + arrowClassName}>
        <img
          className="w-full h-full"
          src={WhiteArrowDown}
        />
      </div>
    );
    break;
  }
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-4 w-full items-center justify-between whitespace-nowrap rounded-md bg-transparent px-[2px] py-2 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        // isLight ? 'bg-transparent text-primary-foreground' : 'bg-primary-foreground/50 text-background',
        border ? 'border border-input' : 'border-none',
        className
      )}
      {...props}
    >
      <div className="px-2 text-sm">
        {children}
      </div>
      <SelectPrimitive.Icon asChild>
        {
          arrowComponent
        }
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="right-2 absolute flex justify-center items-center w-3.5 h-3.5">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="w-4 h-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
};

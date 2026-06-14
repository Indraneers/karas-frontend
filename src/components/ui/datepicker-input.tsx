"use client";

import * as React from "react";
import { format, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DayEventHandler, SelectSingleEventHandler } from "react-day-picker";

export interface DatePickerInputProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "onChange"
> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  formatString?: string;
  onDayClick?: DayEventHandler<React.MouseEvent<Element, MouseEvent>>;
}

/**
 * Modernized DatePickerInput
 * - Restores onDayClick support
 * - Uses forwardRef for compatibility with shadcn/ui and form libraries
 * - Derives display value directly from props to stay in sync
 */
export const DatePickerInput = React.forwardRef<
  HTMLButtonElement,
  DatePickerInputProps
>(
  (
    {
      value,
      onChange,
      onDayClick,
      formatString = "MMM dd, yyyy",
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    // Derived State: Instant sync with parent props
    const displayValue =
      value && isValid(value) ? format(value, formatString) : "Select Date";

    const handleSelect: SelectSingleEventHandler = (selectedDate) => {
      onChange?.(selectedDate);
      if (selectedDate) setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            type="button"
            variant="outline"
            className={cn(
              "justify-between px-4 py-1.5 h-auto font-normal text-xs",
              !value && "text-muted-foreground",
              className,
            )}
            {...props}
          >
            <span
              className={cn(
                value ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {displayValue}
            </span>
            <CalendarIcon className="opacity-50 ml-2 w-3.5 h-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto" align="start" sideOffset={8}>
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            onDayClick={onDayClick} // Restored property
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
);

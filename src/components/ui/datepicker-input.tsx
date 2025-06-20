"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DayEventHandler } from "react-day-picker";

export interface DatePickerInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  formatString?: string;
  onDayClick?: DayEventHandler<React.MouseEvent<Element, MouseEvent>> | undefined;
}

export const DatePickerInput = React.forwardRef<HTMLInputElement, DatePickerInputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ value, onChange, onDayClick, formatString = "MMM dd, yyyy", className, ...props }, _ref) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState<string>();

    // Update inputValue when parent changes value
    React.useEffect(() => {
      setInputValue(value ? format(value, formatString) : "");
    }, [value, formatString]);


    const handleSelect = (selectedDate: Date | undefined) => {
      if (!selectedDate) return;
      onChange?.(selectedDate);
      setInputValue(format(selectedDate, formatString));
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn([
              "font-normal h-8 text-muted-foreground text-xs justify-between",
              className
            ])}
            variant="outline"
          >
            <span className="text-foreground">{inputValue || 'Select Date'}</span>
            <CalendarIcon className="!w-3 !h-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-auto overflow-hidden"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            onDayClick={onDayClick}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePickerInput.displayName = "DatePickerInput";

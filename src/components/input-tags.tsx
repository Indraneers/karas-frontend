"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type InputTagsProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value: string[];
  onChange: (value: string[]) => void;
};

const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = React.useState("");

    const addTag = (tag: string) => {
      const trimmedTag = tag.trim();
      if (trimmedTag && !value.includes(trimmedTag)) {
        onChange([...value, trimmedTag]);
      }
      setPendingDataPoint("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      
      // Handle comma-split logic immediately during change
      if (val.includes(",")) {
        const parts = val.split(",").map((p) => p.trim()).filter(Boolean);
        const uniqueTags = Array.from(new Set([...value, ...parts]));
        onChange(uniqueTags);
        setPendingDataPoint("");
      } else {
        setPendingDataPoint(val);
      }
    };

    const removeTag = (tagToRemove: string) => {
      onChange(value.filter((tag) => tag !== tagToRemove));
    };

    return (
      <div
        className={cn(
          "flex flex-wrap gap-2 bg-white dark:bg-neutral-950 px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-md ring-offset-white w-full min-h-10 text-sm",
          "has-focus-visible:outline-none has-focus-visible:ring-2 has-focus-visible:ring-neutral-950 has-focus-visible:ring-offset-2 dark:has-focus-visible:ring-neutral-300",
          className
        )}
      >
        {value.map((item) => (
          <Badge key={item} variant="secondary" className="bg-accent hover:bg-accent/80 transition-colors text-accent-foreground">
            {item}
            <button
              type="button"
              className="ml-2 rounded-full outline-none focus:ring-2 focus:ring-ring ring-offset-background focus:ring-offset-2"
              onClick={() => removeTag(item)}
            >
              <XIcon className="w-3 h-3" />
              <span className="sr-only">Remove {item}</span>
            </button>
          </Badge>
        ))}
        <input
          ref={ref}
          className="flex-1 bg-transparent outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed"
          value={pendingDataPoint}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag(pendingDataPoint);
            } else if (
              e.key === "Backspace" &&
              pendingDataPoint.length === 0 &&
              value.length > 0
            ) {
              e.preventDefault();
              onChange(value.slice(0, -1));
            }
          }}
          {...props}
        />
      </div>
    );
  }
);

InputTags.displayName = "InputTags";

export { InputTags };
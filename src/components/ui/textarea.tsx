import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({
  ref,
  className,
  ...props
}: TextareaProps & { ref?: React.RefObject<HTMLTextAreaElement> }) => {
  return (
    <textarea
      className={cn(
        "flex disabled:opacity-50 p-2 border border-border rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full min-h-[4ch] placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
};

export { Textarea };

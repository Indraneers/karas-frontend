import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "[&>svg]:top-4 [&>svg]:left-4 [&>svg]:absolute relative px-4 py-3 [&>svg~*]:pl-7 border rounded-lg w-full [&>svg]:text-foreground text-sm [&>svg+div]:translate-y-[-3px]",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "group-has-[>svg]/alert:col-start-2 font-medium [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "[&_p:not(:last-child)]:mb-4 text-muted-foreground [&_a]:hover:text-foreground text-sm [&_a]:underline [&_a]:underline-offset-3 text-balance md:text-pretty",
        className,
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("top-2 right-2 absolute", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };

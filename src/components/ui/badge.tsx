import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-semibold text-xs transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        'info-primary':
          "bg-primary/10 border-primary/30 rounded-full text-primary/70",
        'info-green':
          "bg-emerald-100 border-emerald-300 rounded-full text-emerald-700",
        'info-dark-green':
          "bg-green-100 border-green-700 rounded-full text-green-800",
        'info-amber':
          "bg-amber-100 border-amber-700 rounded-full text-amber-800",
        'info-blue':
          "bg-blue-100 border-blue-300 rounded-full text-blue-700"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

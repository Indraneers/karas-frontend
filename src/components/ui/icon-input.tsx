"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type IconProps = React.SVGProps<SVGSVGElement> & { children?: never };

type IconPropsWithBehavior<T extends IconProps> = T & {
  behavior: "append" | "prepend";
};

type IconComponent<T extends IconProps = IconProps> = React.ComponentType<T>;

export type InputProps<T extends IconComponent = IconComponent> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: T | LucideIcon;
    iconProps?: T extends IconComponent<infer P>
      ? IconPropsWithBehavior<P>
      : never;
  };

function IconInput({ className, type, icon, iconProps, ...props }: InputProps) {
  const Icon = icon;
  const {
    behavior: iconBehavior,
    className: iconClassName,
    ...restIconProps
  } = iconProps || { behavior: "prepend" as const };

  return (
    <div
      className={cn(
        "flex justify-center items-center bg-white disabled:opacity-50 shadow-sm m-0 p-0 px-3 py-0 border border-border rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring text-sm transition-colors disabled:cursor-not-allowed",
        className,
      )}
    >
      {Icon && type !== "file" && iconBehavior === "prepend" && (
        <Icon
          className={cn("mr-3 w-4 h-4 text-muted-foreground", iconClassName)}
          {...restIconProps}
        />
      )}
      <input
        type={type}
        className={cn(
          "flex justify-center items-center bg-transparent file:bg-transparent disabled:opacity-50 file:border-0 focus-visible:outline-none w-full h-9 file:font-medium placeholder:text-muted-foreground file:text-sm disabled:cursor-not-allowed",
          type !== "file" ? "py-1" : "py-1.5",
        )}
        {...props}
      />
      {Icon && type !== "file" && iconBehavior === "append" && (
        <Icon
          className={cn("ml-3 w-4 h-4 text-muted-foreground", iconClassName)}
          {...restIconProps}
        />
      )}
    </div>
  );
}

export { IconInput };

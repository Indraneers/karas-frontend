import { cn } from "@/lib/utils";
import { TypographyProps } from "@/types/typography";

export function TypographyH3({ className, children }: TypographyProps) {
  return (
    <h3 className={
      cn(
        "scroll-m-20 font-semibold text-base xl:text-lg tracking-tight",
        className
      )
    }>
      { children }
    </h3>
  );
}
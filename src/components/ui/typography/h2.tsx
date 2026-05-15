import { cn } from "@/lib/utils";
import { TypographyProps } from "@/types/typography";

export function TypographyH2({ className, children }: TypographyProps) {
  return (
    <h2 className={
      cn([
        "scroll-m-20 first:mt-0 font-display font-medium text-lg xl:text-xl tracking-tight",
        className
      ])
    }>
      {children}
    </h2>
  );
}
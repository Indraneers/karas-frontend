import { cn } from "@/lib/utils";
import { TypographyProps } from "@/types/typography";

export function TypographyH1({ className, children }: TypographyProps) {
  return (
    <h1 className={
      cn([
        "scroll-m-20 font-body font-bold text-2xl lg:text-3xl tracking-tight",
        className
      ])
    }>
      {children}
    </h1>
  );
}
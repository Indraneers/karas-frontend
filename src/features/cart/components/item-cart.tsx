import { TypographyH3 } from "@/components/ui/typography/h3";
import { cn } from "@/lib/utils";

interface ItemCartProps {
  className?: string;
  children?: React.ReactNode;
}

export function ItemCart({ className, children } : ItemCartProps) {
  return (

    <div className={cn([
      'overflow-hidden flex flex-col',
      className
    ])}>
      <TypographyH3>
        Item Cart
      </TypographyH3>
      <div className="relative flex-grow mt-2 h-full">
        <div className="absolute inset-0 flex flex-col gap-3 p-2 overflow-scroll">
          { children }
        </div>
      </div>
    </div>
  );
}
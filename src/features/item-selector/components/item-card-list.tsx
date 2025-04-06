import { cn } from "@/lib/utils";

interface ItemCardListProps {
  children?: React.ReactNode;
  className?: string;
  onScroll?: React.UIEventHandler<HTMLDivElement> | undefined;
}

export function ItemCardList({ children, className, onScroll }: ItemCardListProps) {
  return (
    <div 
      className={
        cn([
          "relative h-full overflow-y-scroll",
          className
        ])
      }
      onScroll={onScroll}
    >
      <div className="absolute inset-0 gap-2 grid grid-cols-4 auto-rows-max h-full">
        {children}
      </div>
    </div>
  );
}
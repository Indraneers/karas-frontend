import { cn } from "@/lib/utils";

interface ItemCardListProps {
  children?: React.ReactNode;
  className?: string;
}

export function ItemCardList({ children, className }: ItemCardListProps) {
  return (
    <div className={
      cn([
        "relative h-full overflow-y-scroll",
        className
      ])
    }>
      <div className="absolute inset-0 gap-4 grid grid-cols-4">
        {children}
      </div>
    </div>
  );
}
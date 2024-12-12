import { cn } from "@/lib/utils";

interface ItemCartProps {
  className?: string;
  children?: React.ReactNode;
}

export function ItemCart({ className, children } : ItemCartProps) {
  return (
    <div className={cn([
      "relative h-full",
      className
    ])}>
      <div className="absolute inset-0 flex flex-col gap-2 bg-gray-200 p-2 rounded-xl overflow-scroll">
        { children }
      </div>
    </div>
  );
}
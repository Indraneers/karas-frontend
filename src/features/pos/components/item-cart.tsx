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
      <div className="absolute inset-0 gap-2 grid grid-rows-[repeat(5,calc(100%/4.5))] auto-rows-[calc(100%/4.5)] bg-gray-200 p-2 rounded-xl overflow-scroll">
        { children }
      </div>
    </div>
  );
}
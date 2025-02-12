import { cn } from "@/lib/utils";

export function SearchGroup({ className, title, isOpen, children }: { className?: string, title: string, isOpen: boolean, children: React.ReactNode }) {
  return (
    <div className={cn([
      "hidden px-2 pb-2",
      isOpen && 'block',
      className
    ])}>
      <div className="font-medium text-muted-foreground text-xs">
        {title}
      </div>
      <div className="flex flex-col gap-1 mt-1">
        {children}
      </div>
    </div>
  );
}
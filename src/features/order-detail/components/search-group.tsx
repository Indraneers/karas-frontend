import { cn } from "@/lib/utils";

export function SearchGroup({ title, isOpen, children }: { title: string, isOpen: boolean, children: React.ReactNode }) {
  return (
    <div className={cn([
      "hidden px-2 pb-2",
      isOpen && 'block'
    ])}>
      <div className="font-medium text-muted-foreground text-xs">
        {title}
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {children}
      </div>
    </div>
  );
}
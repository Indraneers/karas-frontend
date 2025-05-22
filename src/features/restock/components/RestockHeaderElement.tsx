import { cn } from "@/lib/utils";

export interface RestockHeaderElementProps {
  label: string;
  children: React.ReactNode;
  color?: 'GREEN' | 'RED'
}

export function RestockHeaderElement({ label, children, color  }: RestockHeaderElementProps) {
  return (
    <div>
      <div className="text-muted-foreground text-xs xl:text-sm capitalize">
        {label}
      </div>
      <div className={cn([
        "font-bold text-lg xl:text-2xl text-foreground",
        color === 'GREEN' && 'text-green-500',
        color === 'RED' && 'text-red-500'
      ])}>
        {children}
      </div>
    </div>
  );
}
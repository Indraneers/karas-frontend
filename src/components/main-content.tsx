import { cn } from "@/lib/utils";

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContent({ children, className }: MainContentProps) {
  return (
    <div className={cn(
      "grow bg-background w-full px-4 lg:px-6",
      className
    )}>
      {children}
    </div>
  );
}
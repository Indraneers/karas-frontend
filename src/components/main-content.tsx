import { cn } from "@/lib/utils";

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContent({ children, className }: MainContentProps) {
  return (
    <div className={cn([
      "flex-grow bg-background w-full container",
      className
    ])}>
      {children}
    </div>
  );
}
import { cn } from "@/lib/utils";

interface SectionContentProps {
  children?: React.ReactNode;
  className?: string;
}
export function SectionContent({ className, children }: SectionContentProps) {
  return (
    <div className={cn([
      'px-4 py-2 h-full',
      className
    ])}>
      {children}
    </div>
  );
}
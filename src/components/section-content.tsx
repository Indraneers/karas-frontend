import { cn } from "@/lib/utils";

interface SectionContentProps {
  children?: React.ReactNode;
  className?: string;
}
export function SectionContent({ className, children }: SectionContentProps) {
  return (
    <div className={cn([
      'p-2',
      className
    ])}>
      {children}
    </div>
  );
}
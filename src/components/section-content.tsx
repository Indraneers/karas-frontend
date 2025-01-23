import { cn } from "@/lib/utils";

interface SectionContentProps {
  children?: React.ReactNode;
  className?: string;
}
export function SectionContent({ className, children }: SectionContentProps) {
  return (
    <div className={cn([
      'mt-4 h-full',
      className
    ])}>
      {children}
    </div>
  );
}
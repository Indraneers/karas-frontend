import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  children?: React.ReactNode;
  className?: string;
}
export function SectionHeader({ className, children }: SectionHeaderProps) {
  return (
    <div className={cn([
      className
    ])}>
      {children}
    </div>
  );
}
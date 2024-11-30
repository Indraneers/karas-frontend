import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface SectionHeaderProps {
  children?: React.ReactNode;
  className?: string;
}
export function SectionHeader({ className, children }: SectionHeaderProps) {
  return (
    <>
      <div className={cn([
        'p-2',
        className
      ])}>
        {children}
      </div>
      <Separator />
    </>
  );
}
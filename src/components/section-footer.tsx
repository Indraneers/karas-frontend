import { cn } from "@/lib/utils";

interface SectionFooterProps {
  children?: React.ReactNode;
  className?: string;
}
export function SectionFooter({ className, children }: SectionFooterProps) {
  return (
    <>
      <div className={cn([
        'px-4',
        className
      ])}>
        {children}
      </div>
    </>
  );
}

import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { TypographyH2 } from "./ui/typography/h2";

interface FormGroupProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function FormGroup({ title, children, className }: FormGroupProps) {
  return (
    <div className={cn([
      className
    ])}>
      <TypographyH2>{title}</TypographyH2>
      <Separator className="mt-2" />
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}
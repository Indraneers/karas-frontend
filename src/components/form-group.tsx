import { Separator } from "./ui/separator";
import { Header } from "./header";
import { cn } from "@/lib/utils";

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
      <Header level={2}>{title}</Header>
      <Separator className="mt-2" />
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}
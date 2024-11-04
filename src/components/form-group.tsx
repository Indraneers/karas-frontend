import { Separator } from "./ui/separator";
import { Header } from "./header";

interface FormGroupProps {
  title: string;
  children: React.ReactNode;
}

export function FormGroup({ title, children }: FormGroupProps) {
  return (
    <div>
      <Header level={2}>{title}</Header>
      <Separator className="mt-2" />
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}
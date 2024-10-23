import { Button } from "@/components/ui/button";

interface CreateCustomerProps {
  className?: string;
}

export function CreateCustomerButton({ className = '' }: CreateCustomerProps) {
  return (
    <Button className={
      'bg-secondary hover:bg-emerald-500 px-4 rounded-[5px] font-semibold text-background '
      + className
    }>
      Add a Customer
    </Button>
  );
}
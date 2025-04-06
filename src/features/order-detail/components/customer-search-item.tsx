import { CustomerDto } from "@/features/customer/types/customer.dto";
import { usePosStore } from "@/features/pos/store/pos";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface CustomerSearchItemProps {
  className?: string;
  customer: CustomerDto;
  setQ: (text: string) => void;
  setOpen: (b: boolean) => void;
}

export function CustomerSearchItem({ className, customer, setQ, setOpen }: CustomerSearchItemProps) {
  const { setCustomer } = usePosStore();

  function handleClick() {
    setCustomer(customer) ;
    setQ('');
    setOpen(false);
  }

  return (
    <div
      onClick={handleClick}
      className={cn([
        "hover:bg-accent group gap-2 hover:text-background items-center grid grid-cols-[auto,1fr] p-1 rounded-md cursor-pointer",
        className
      ])}
    >
      <div className={cn([
        "bg-primary p-1 rounded-sm h-8 w-8",
        className
      ])}>
        <User className={cn([
          "w-6 h-6 text-white"
        ])} />
      </div>
      <div className="flex flex-col">
        <div className="font-medium text-sm">
          {customer.name}
        </div>
        <div className="font-light text-muted-foreground group-hover:text-background text-xs">
          
          {customer.contact}
        </div>
      </div>
    </div>
  );
}
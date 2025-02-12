import { CustomerDto } from "@/features/customer/types/customer.dto";
import { usePosStore } from "@/features/pos/store/pos";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface CustomerSearchItemProps {
  className?: string;
  customer: CustomerDto;
  setQ: (text: string) => void;

}

export function CustomerSearchItem({ className, customer, setQ }: CustomerSearchItemProps) {
  const { setCustomer } = usePosStore();

  function handleClick() {
    setCustomer(customer) ;
    setQ('');
  }

  return (
    <div
      onClick={handleClick}
      className={cn([
        "hover:bg-accent group gap-2 hover:text-background grid grid-cols-[auto,1fr] p-1 rounded-md cursor-pointer",
        className
      ])}
    >
      <div className="place-content-center grid bg-blue-50 p-1 border border-foreground group-hover:border-accent border-blue-400 rounded h-9 aspect-square transition-all">
        <User className="group-hover:text-accent text-blue-400 text-foreground" strokeWidth={1} />
      </div>
      <div className="flex flex-col">
        <div className="font-medium text-sm">
          {customer.name}
        </div>
        <div className="group-hover:text-background font-light text-muted-foreground text-xs">
          
          {customer.contact}
        </div>
      </div>
    </div>
  );
}
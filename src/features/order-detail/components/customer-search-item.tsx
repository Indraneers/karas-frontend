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
        "hover:bg-accent group gap-2 hover:text-background grid grid-cols-[auto,1fr] border border-foreground p-1 rounded-md cursor-pointer",
        className
      ])}
    >
      <div className="place-content-center border-foreground group-hover:border-accent grid bg-blue-50 p-1 border border-blue-400 rounded h-full transition-all aspect-square">
        <User size={32} className="group-hover:text-accent text-blue-400 text-foreground" strokeWidth={1} />
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-base">
          {customer.name}
        </div>
        <div className="group-hover:text-background text-muted-foreground text-sm">
          {customer.contact}
        </div>
      </div>
    </div>
  );
}
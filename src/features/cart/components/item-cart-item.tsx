import { Currency } from "@/components/currency";
import { Button } from "@/components/ui/button";
import { ProductRequestDto } from "@/features/product/types/product.dto";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { MouseEventHandler } from "react";

interface ItemCartItemProps {
  children?: React.ReactNode;
  product?: ProductRequestDto;
  totalCost: number;
  onClickRemove?: MouseEventHandler<HTMLButtonElement>;
}

export function ItemCartItem
({ children, totalCost, onClickRemove }: ItemCartItemProps) {
  return (
    <div className={cn([
      "relative border rounded-lg"
    ])}>
      <Button
        onClick={onClickRemove}
        className="top-[-0.25rem] left-[-0.25rem] absolute hover:bg-primary/80 border w-6 h-6" 
        size='icon'>
        <X className="!w-4 !h-4" />
      </Button>
      <div className="items-center grid grid-cols-[5fr,1fr] bg-accent rounded-lg h-full">
        <div className="bg-card p-2 rounded-lg h-full">
          {children}
        </div>
        <div className="place-content-center grid text-background text-xs">
          <Currency amount={totalCost} />
        </div>
      </div>
    </div>
  );
}
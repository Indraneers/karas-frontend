import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, ShoppingCart, Trash } from "lucide-react";

export function POSActions({ className } : { className?: string }) {
  return (
    <div className={cn([
      'grid grid-cols-3 ',
      className
    ])}>
      <Button className="bg-green-500 hover:bg-green-400 rounded-l-full rounded-r-none font-semibold">
        <span>
          <ShoppingCart />
        </span>
        Pay
      </Button>
      <Button className="bg-amber-500 hover:bg-amber-400 rounded-none font-semibold">
        <span>
          <Pause />
        </span>
        Hold
      </Button>
      <Button className="bg-primary rounded-l-none rounded-r-full font-semibold">
        <span>
          <Trash />
        </span>
        Reset
      </Button>
    </div>
  );
}
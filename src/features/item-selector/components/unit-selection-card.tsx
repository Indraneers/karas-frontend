import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContentWrapper, DialogTrigger } from "@/components/ui/dialog";
import { ItemAdder } from "../../pos/components/item-adder";
import { useState } from "react";
import { Unit } from "@/features/unit/types/unit";
import { Currency } from "@/components/currency";
import { Item } from "@/features/sale/types/item";

interface UnitSelectionCardProps {
  unit: Unit
}

export function UnitSelectionCard({ unit }: UnitSelectionCardProps) {
  const [open, setOpen] = useState(false);

  if (!unit.id) {
    return 'error: no id';
  }

  const item: Item = {
    id: '',
    quantity: 1,
    price: unit.price,
    discount: 0,
    unit: {
      ...unit,
      id: unit.id
    }
  };

  return (
    <div className="w-full aspect-square">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">
          <Card className="flex flex-col border-primary hover:bg-accent w-full hover:text-background transition cursor-pointer aspect-square group">
            <CardHeader className="space-y-0 text-left">
              <div className="font-medium text-xl">{unit.name}</div>
              <div className="group-hover:text-background text-foreground/50">
                <Currency amount={unit.price} />
                {
                  unit.product.variable &&
                <span>
                  {' '} / {unit.product.baseUnit}
                </span>
                }
              </div>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter className="flex flex-col items-start text-xs">
              <div className="group-hover:text-background text-foreground/50">{unit.quantity || 0} units left</div>
              <div className="group-hover:text-background">{unit.sku}</div>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogContentWrapper className="bg-transparent shadow-none border-none">
          <ItemAdder item={item} setOpen={setOpen} />
        </DialogContentWrapper>
      </Dialog>
    </div>
  );
}
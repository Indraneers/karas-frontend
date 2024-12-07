import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContentWrapper, DialogTrigger } from "@/components/ui/dialog";
import { ItemAdder } from "./item-adder";
import { Item } from "@/types/item";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/features/product/api/product";
import { useState } from "react";
import { Unit } from "@/types/unit";

interface UnitSelectionCardProps {
  unit: Unit
}

export function UnitSelectionCard({ unit }: UnitSelectionCardProps) {
  const [open, setOpen] = useState(false);
  const { isError, isLoading, isSuccess, data } = useQuery({
    queryKey: ['product-', unit.productId],
    queryFn: () => getProductById(unit.productId),
    enabled: open
  });

  if (!unit.id) {
    return 'error: no id';
  }

  if (isError) {
    return 'error: product doesn\'t exist';
  }

  const item: Item = {
    quantity: 1,
    price: unit.price,
    discount: '0',
    unit: {
      ...unit,
      id: unit.id
    },
    product: data
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Card className="flex flex-col hover:bg-accent w-full h-full hover:text-background transition cursor-pointer aspect-square group">
          <CardHeader className="space-y-0 text-left">
            <div className="font-medium text-2xl">{unit.name}</div>
            <div className="group-hover:text-background text-foreground/50">{`$ ${ unit.price }`}</div>
          </CardHeader>
          <CardContent className="flex-grow" />
          <CardFooter className="flex flex-col items-start text-xs">
            <div className="group-hover:text-background text-foreground/50">{unit.quantity || 0} units left</div>
            <div className="group-hover:text-background">{unit.sku}</div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContentWrapper className="bg-transparent shadow-none border-none">
        { isLoading && 'loading'}
        { isSuccess && <ItemAdder item={item} setOpen={setOpen} /> }
      </DialogContentWrapper>
    </Dialog>
  );
}
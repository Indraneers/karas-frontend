import { cn } from "@/lib/utils";

import { useItemSelectionStore } from "../store/item-selection";
import { UnitSearch } from "@/features/unit/components/unit-search";
import { convertBaseQuantityToDisplayQuantity, convertBaseQuantityToQuantity, convertUnitDtoToUnit } from "@/features/unit/util/convert";
import { ItemEmpty, ItemCardList, ItemSkeletonList } from "./item-selector";
import { getUnits } from "@/features/unit/api/unit";
import React, { useCallback, useEffect } from "react";
import { useInfiniteSearch } from "@/hooks/use-infinite-search";

interface UnitSelectionProps {
  className?: string;
}

export function UnitSelection({ className }: UnitSelectionProps) {
  const [initialLoad, setInitialLoad] = useState(false);
  const { product } = useItemSelectionStore();
  const { q, setQ, data, isLoading, isError, totalElements, hasNextPage, fetchNextPage } = useInfiniteSearch({ 
    getEntity: getUnits, 
    key: ['units'], 
    query: { 
      productId: product?.id
    },
    enabled: true
  });

  const onScrollEvent = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, clientHeight, scrollTop } = event.currentTarget;
    const threshold = 50;
    
    if (scrollHeight - clientHeight <= scrollTop + threshold) {
      if (hasNextPage && fetchNextPage) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (!initialLoad && hasNextPage && fetchNextPage) {
      setInitialLoad(true);
      fetchNextPage();
    }
  }, [initialLoad, hasNextPage, fetchNextPage]);

  return (
    <div className={
      cn([
        'h-full w-full grid grid-rows-[auto,1fr] gap-2',
        className
      ])
    }>
      <UnitSearch value={q} onChange={setQ} />
      { isError && 'error' }
      { !isLoading && totalElements === 0 && 
        <ItemEmpty />
      }
      {
        (isLoading || (data && totalElements > 0)) &&
        <ItemCardList onScroll={onScrollEvent} className="mt-2">
          {
            isLoading && 
            <ItemSkeletonList />
          }
          {data?.pages.map((p, i) => (
            <React.Fragment key={i}>
              {
                p.content.map(u => (
                  <UnitSelectionCard unit={convertUnitDtoToUnit(u)} key={u.id} />
                ))
              }
            </React.Fragment>
          ))}
        </ItemCardList>
      }
    </div>
  );
}

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ItemAdder } from "../../pos/components/item-adder";
import { useState } from "react";
import { Unit } from "@/features/unit/types/unit";
import { Currency } from "@/components/currency";
import { Item } from "@/features/sale/types/item";
import { Badge } from "@/components/ui/badge";
import { ItemImgBg } from "./item-img-bg";

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
          <Card className="group relative flex flex-col hover:bg-accent border-2 border-primary w-full aspect-square overflow-hidden hover:text-background transition cursor-pointer">
            {
              unit.img && unit.img.length > 0 &&
              <ItemImgBg src={unit.img} />
            }
            <CardHeader className="z-10 space-y-0 text-left">
              <div className={cn([
                "font-medium text-xl",
                unit.img && 'text-background'
              ])}>
                {unit.name}
                {
                  unit.product.variable &&
                  <span className="font-light text-lg">
                    {' '}({convertBaseQuantityToDisplayQuantity(unit.toBaseUnit)}{unit.product.baseUnit})
                  </span>
                }
              </div>
              <div className={cn([
                "text-foreground/50 group-hover:text-background",
                unit.img && 'text-background'
              ])}>
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
            <CardFooter className="z-10 flex flex-col items-start text-xs">
              <Badge variant='info-green'>{convertBaseQuantityToQuantity(unit.toBaseUnit, unit.quantity) || 0} units left</Badge>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogContent className="bg-transparent shadow-none border-none w-auto" showCloseButton={false}>
          <ItemAdder item={item} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
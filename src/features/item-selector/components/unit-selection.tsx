import { cn } from "@/lib/utils";

import { useItemSelectionStore } from "../store/item-selection";
import {
  convertUnitDtoToUnit,
  convertVariableQuantityToDiscreteQuantity,
  convertVariableQuantityToDisplayQuantity,
} from "@/features/unit/util/convert";
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
  const {
    data,
    isLoading,
    isError,
    totalElements,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteSearch({
    getEntity: getUnits,
    key: ["units"],
    query: { productId: product?.id },
    enabled: true,
  });

  const onScrollEvent = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollHeight, clientHeight, scrollTop } = event.currentTarget;
      const threshold = 50;

      if (scrollHeight - clientHeight <= scrollTop + threshold) {
        if (hasNextPage && fetchNextPage) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    if (!initialLoad && hasNextPage && fetchNextPage) {
      setInitialLoad(true);
      fetchNextPage();
    }
  }, [initialLoad, hasNextPage, fetchNextPage]);

  return (
    <div className={cn("h-full w-full", className)}>
      {isError && "error"}
      {!isLoading && totalElements === 0 && <ItemEmpty />}
      {(isLoading || (data && totalElements > 0)) && (
        <ItemCardList onScroll={onScrollEvent}>
          {isLoading && <ItemSkeletonList />}
          {data?.pages.map((p, i) => (
            <React.Fragment key={i}>
              {p.content.map((u) => (
                <UnitSelectionCard unit={convertUnitDtoToUnit(u)} key={u.id} />
              ))}
            </React.Fragment>
          ))}
        </ItemCardList>
      )}
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ItemAdder } from "../../pos/components/item-adder";
import { useState } from "react";
import { Unit } from "@/features/unit/types/unit";
import { Currency } from "@/components/currency";
import { Item } from "@/features/sale/types/item";
import { ProductIdentifier } from "@/features/product/components/product-identifier";
import { Badge } from "@/components/ui/badge";
import { ItemImgBg } from "./item-img-bg";
import { ItemContextMenu } from "./item-context-menu";

interface UnitSelectionCardProps {
  unit: Unit;
}

export function UnitSelectionCard({ unit }: UnitSelectionCardProps) {
  const [open, setOpen] = useState(false);

  if (!unit.id) return null;

  const item: Item = {
    id: "",
    quantity: 1,
    price: unit.price,
    discount: 0,
    unit: { ...unit, id: unit.id },
  };

  const stockCount =
    convertVariableQuantityToDiscreteQuantity(unit.quantity, unit.toBaseUnit) || 0;
  const lowStock = stockCount > 0 && stockCount <= 3;

  return (
    <ItemContextMenu label="unit" name={unit.product.name}>
      <div className="w-full aspect-square">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full h-full">
          <div className="group relative flex flex-col h-full p-3 rounded-lg border border-border/60 bg-card transition cursor-pointer hover:border-foreground/20 hover:bg-muted/30 text-left overflow-hidden">
            {unit.img && unit.img.length > 0 && <ItemImgBg src={unit.img} />}
            <div className="z-10 flex items-center gap-1.5 min-w-0">
              <span className="font-semibold text-sm text-foreground truncate flex-1">
                {unit.product.name}
              </span>
              <ProductIdentifier identifier={unit.product.identifier} />
            </div>
            <div className="z-10 mt-1 inline-flex items-center gap-1.5 text-xs self-start">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-foreground/[0.06] text-foreground font-medium">
                {unit.name}
              </span>
              {unit.product.variable && (
                <span className="text-muted-foreground tabular-nums">
                  {convertVariableQuantityToDisplayQuantity(unit.toBaseUnit)}
                  {unit.product.baseUnit}
                </span>
              )}
            </div>
            <div className="z-10 mt-auto pt-2 flex items-end justify-between gap-2">
              <Badge
                variant={
                  stockCount === 0 ? "destructive" : lowStock ? "info-orange" : "info-green"
                }
                className="text-[10px]"
              >
                {stockCount} left
              </Badge>
              <div className="font-display tabular-nums text-foreground text-base">
                <Currency amount={unit.price} />
                {unit.product.variable && (
                  <span className="text-[11px] text-muted-foreground">
                    {" "}/{unit.product.baseUnit}
                  </span>
                )}
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent
          className="bg-transparent shadow-none border-none outline-none ring-0 w-auto"
          showCloseButton={false}
        >
          <ItemAdder item={item} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
      </div>
    </ItemContextMenu>
  );
}

/**
 * Variant used by the global unit search results. Same click-to-add flow
 * as {@link UnitSelectionCard}, but the layout emphasizes product context
 * (name + identifier) over the unit name — because identical unit names
 * across products are common ("Bottle 1" for everything).
 */
export function UnitSearchResultCard({ unit }: { unit: Unit }) {
  const [open, setOpen] = useState(false);
  if (!unit.id) return null;

  const item: Item = {
    id: "",
    quantity: 1,
    price: unit.price,
    discount: 0,
    unit: { ...unit, id: unit.id },
  };

  const stockCount = convertVariableQuantityToDiscreteQuantity(
    unit.quantity,
    unit.toBaseUnit
  ) || 0;
  const lowStock = stockCount > 0 && stockCount <= 3;

  return (
    <ItemContextMenu label="unit" name={unit.product.name}>
      <div className="w-full aspect-square">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full h-full">
          <Card className="group relative flex flex-col h-full border border-border/60 bg-card overflow-hidden transition cursor-pointer hover:border-foreground/20 hover:bg-muted/30 p-3 text-left">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-semibold text-sm text-foreground truncate flex-1">
                {unit.product.name}
              </span>
              <ProductIdentifier identifier={unit.product.identifier} />
            </div>
            <div className="mt-1 inline-flex items-center gap-1.5 text-xs self-start">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-foreground/[0.06] text-foreground font-medium">
                {unit.name}
              </span>
              {unit.product.variable && (
                <span className="text-muted-foreground tabular-nums">
                  {convertVariableQuantityToDisplayQuantity(unit.toBaseUnit)}
                  {unit.product.baseUnit}
                </span>
              )}
            </div>
            <div className="mt-auto pt-2 flex items-end justify-between gap-2">
              <Badge variant={stockCount === 0 ? "destructive" : lowStock ? "info-orange" : "info-green"} className="text-[10px]">
                {stockCount} left
              </Badge>
              <div className="font-display tabular-nums text-foreground text-base">
                <Currency amount={unit.price} />
                {unit.product.variable && (
                  <span className="text-[11px] text-muted-foreground"> /{unit.product.baseUnit}</span>
                )}
              </div>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent
          className="bg-transparent shadow-none border-none outline-none ring-0 w-auto"
          showCloseButton={false}
        >
          <ItemAdder item={item} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
      </div>
    </ItemContextMenu>
  );
}

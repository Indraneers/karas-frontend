
import { ProductSearch } from "@/features/product/components/product-search";
import { ItemCardList, ItemEmpty, ItemSkeletonList } from "./item-selector";
import { useInfiniteSearch } from "@/hooks/use-infinite-search";
import { getProducts } from "@/features/product/api/product";
import React, { useCallback, useEffect, useState } from "react";

interface ProductSelectionProps {
  className?: string;
}

export function ProductSelection({ className }: ProductSelectionProps) {
  const [initialLoad, setInitialLoad] = useState(false);
  const { subcategory } = useItemSelectionStore();

  const { q, setQ, data, isLoading, isError, totalElements, hasNextPage, fetchNextPage } = useInfiniteSearch({
    getEntity: getProducts,
    key: ['products'],
    query: { subcategoryId: subcategory?.id }
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
      <ProductSearch value={q} onChange={setQ} />
      { isError && "error" }
      { totalElements === 0 && 
        <ItemEmpty />
      }
      {
        (isLoading || (data && data.pages && totalElements > 0)) &&
        <ItemCardList onScroll={onScrollEvent} className="mt-2">
          {
            isLoading && 
            <ItemSkeletonList />
          }
          {
            data?.pages.map((p, i) => (
              <React.Fragment key={i}>
                {
                  p.content.map((product) => (
                    <ProductSelectionCard product={product} key={product.id} />
                  ))
                }
              </React.Fragment>
            ))
          }
        </ItemCardList>
      }
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { ProductResponseDto } from "@/features/product/types/product.dto";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { getImageUrl } from "@/lib/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductSelectionCardProps {
  product: ProductResponseDto
}

export function ProductSelectionCard({ product }: ProductSelectionCardProps) {
  const { setProduct, setSelector } = useItemSelectionStore();

  function handleClick() {
    setSelector(ItemSelectionEnum.UNIT);
    setProduct(product);
  }

  return (
    <Card 
      className="group relative grid hover:bg-accent py-2 border-primary w-full aspect-square overflow-hidden hover:text-background transition cursor-pointer"
      onClick={handleClick}
    >
      <div className="absolute inset-0">
        {
          product.img && product.img.length > 0 &&
          <img className="brightness-50 object-cover" src={getImageUrl(product.img)} loading="lazy" />
        }
      </div>
      <CardContent className={cn([
        "z-10 text-sm w-full",
        product.img
      ])}>
        <div className={cn([
          "font-bold xl:text-sm text-xs",
          product.img && 'text-background'
        ])}>{product.name}</div>
        <div className={cn([
          "group-hover:text-background flex flex-col items-start gap-1 font-medium text-background mt-2"
        ])}>
          <Badge className={cn([
            'hidden rounded-full bg-amber-500 hover:bg-amber-600 xl:text-[10px] text-[9px]',
            product.identifier && 'inline-block'
          ])}>
            {product.identifier}
          </Badge>
          <Badge className={cn([
            "bg-accent rounded-full",
            !product.img && "group-hover:bg-background group-hover:text-accent xl:text-[10px] text-[9px]",
            product.identifier && 'mt-1'
          ])}>
            {product.unitCount || 0} units
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
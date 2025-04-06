import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { ProductSelectionCard } from "./product-selection-card";
import { useItemSelectionStore } from "../store/item-selection";
import { ProductSearch } from "@/features/product/components/product-search";
import { ItemSkeletonList } from "./item-skeleton-list";
import { ItemEmpty } from "./item-empty";
import { useInfiniteSearch } from "@/hooks/use-infinite-search";
import { getProducts } from "@/features/product/api/product";
import React, { useCallback } from "react";

interface ProductSelectionProps {
  className?: string;
}

export function ProductSelection({ className }: ProductSelectionProps) {
  const { subcategory } = useItemSelectionStore();

  const { q, setQ, data, isLoading, isError, totalElements, hasNextPage, fetchNextPage } = useInfiniteSearch({
    getEntity: getProducts,
    key: 'products',
    query: { subcategoryId: subcategory?.id }
  });

  const onScrollEvent = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, clientHeight, scrollTop } = event.currentTarget;
    const threshold = 50;
      
    if (scrollHeight - clientHeight <= scrollTop + threshold) {
      console.log(hasNextPage, fetchNextPage);
      if (hasNextPage && fetchNextPage) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage]);

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
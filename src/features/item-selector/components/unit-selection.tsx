import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { UnitSelectionCard } from "./unit-selection-card";
import { useItemSelectionStore } from "../store/item-selection";
import { UnitSearch } from "@/features/unit/components/unit-search";
import { convertUnitDtoToUnit } from "@/features/unit/util/convert";
import { ItemSkeletonList } from "./item-skeleton-list";
import { ItemEmpty } from "./item-empty";
import { getUnits } from "@/features/unit/api/unit";
import React, { useCallback } from "react";
import { useInfiniteSearch } from "@/hooks/use-infinite-search";

interface UnitSelectionProps {
  className?: string;
}

export function UnitSelection({ className }: UnitSelectionProps) {
  const { product } = useItemSelectionStore();
  const { q, setQ, data, isLoading, isError, totalElements, hasNextPage, fetchNextPage } = useInfiniteSearch({ 
    getEntity: getUnits, 
    key: 'units', 
    query: { 
      productId: product?.id
    },
    enabled: true
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
      <UnitSearch value={q} onChange={setQ} />
      { isError && 'error' }
      { totalElements === 0 && 
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
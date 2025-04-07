import { cn } from "@/lib/utils";
import { UnitResponseDto } from "../types/unit.dto";
import { Box } from "lucide-react";
import { getImageUrl } from "@/lib/image";
import { ProductTypeBadge } from "@/features/product/components/product-type-badge";
import { UnitDtoQuantityBadge } from "./unit-quantity-badge";
import { convertRawQuantityToBaseQuantity } from "../util/convert";
import { SearchLoading } from "@/components/search-loading";
import { FilterIcon } from "@/components/filter-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductIdentifier } from "@/features/product/components/product-identifier";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
import { Page } from "@/types/page";
import React from "react";
import { SearchNext } from "@/features/order-detail/components/search-group";

export function UnitSearchItem({ unit } : { unit: UnitResponseDto}) {
  const product = unit.product;

  return (
    <div className="group items-center gap-2 grid grid-cols-[auto,1fr] hover:bg-accent p-1 rounded-md cursor-pointer">
      <div className="self-stretch group-hover:bg-background p-2 border-2 border-accent rounded h-10 aspect-square">
        { !unit.subcategoryImg ?
          <Box className="w-full h-full text-accent" />
          :
          <FilterIcon
            className={cn([
              'w-full h-full',
              'bg-accent'
            ])}
            src={getImageUrl(unit.subcategoryImg)}
          />
        }
      </div>
      <div className="group-hover:text-background">
        <div className="flex justify-between items-center">
          <div className="font-semibold">
            {unit.name}
            {
              product.variable && ` (${ convertRawQuantityToBaseQuantity(unit.toBaseUnit) }${ product.baseUnit })`
            }
          </div>
          <div className="flex-shrink-0">
            <UnitDtoQuantityBadge 
              variable={product.variable}
              baseUnit={product.baseUnit}
              quantity={unit.quantity}
              toBaseUnit={unit.toBaseUnit}
            />
            <ProductTypeBadge 
              className='ml-2 font-semibold text-background !text-xs'
              variable={product.variable}
            />
          </div>
        </div>
        <div className="mt-1 text-xs">{unit.product.name} <ProductIdentifier identifier={unit.product.identifier} /></div>
      </div>
    </div>
  );
}

interface UnitSearchListProps {
  className?: string;
  data?: InfiniteData<Page<UnitResponseDto>, unknown> | undefined;
  totalElements: number;
  isLoading?: boolean;
  onValueChange: (unit: UnitResponseDto) => void;
  fetchNextPage: ((options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<Page<UnitResponseDto>, unknown>, Error>>) | undefined;
  hasNextPage: boolean;
}

export function UnitSearchList
({ className, data, isLoading = false, onValueChange, totalElements, fetchNextPage, hasNextPage = false }: UnitSearchListProps) {
  return (
    <ScrollArea className="h-60">
      <div className="mb-1 font-semibold text-muted-foreground text-xs">Search Units</div>
      <div className={cn([
        'space-y-2 font-body',
        className
      ])}>
        {
          totalElements === 0 &&
          <div className="place-content-center grid p-4 h-40 text-muted-foreground text-sm text-center">Empty...</div>
        }
        {isLoading &&
          <SearchLoading />
        }
        {
          data?.pages &&
          data.pages.map((p, i) => (
            <React.Fragment key={i}>
              {p.content.map(u => (
                <div onClick={() => onValueChange(u)} key={u.id}>
                  <UnitSearchItem unit={u} />
                </div>
              ))}
            </React.Fragment>
          ))
        }
        {(!data?.pages || !totalElements) && 
          <div className="place-content-center grid p-4 h-40 text-muted-foreground text-sm text-center">Search for a unit...</div>
        }
      </div>
      {
        hasNextPage &&
        <SearchNext placeholder='Units' fetchNextPage={fetchNextPage} />
      }
    </ScrollArea>
  );
}
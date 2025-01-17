import { cn } from "@/lib/utils";
import { UnitResponseDto } from "../types/unit.dto";
import { Box } from "lucide-react";
import { getImageUrl } from "@/lib/image";
import { ProductTypeBadge } from "@/features/product/components/product-type-badge";
import { UnitDtoQuantityBadge } from "./unit-quantity-badge";
import { convertQuantityDtoToQuantity } from "../util/convert";
import { LoadingSpinner } from "@/components/loading-spinner";

export function UnitSearchItem({ unit } : { unit: UnitResponseDto}) {
  const product = unit.product;

  return (
    <div className="items-center gap-2 grid grid-cols-[auto,1fr] hover:bg-accent p-1 rounded-md cursor-pointer group">
      <div className="group-hover:bg-background border-2 border-accent p-2 rounded h-full aspect-square self-stretch">
        { (!unit.subcategoryImg) && <Box className="w-full h-full text-primary" />}
        { (unit.subcategoryImg) && <img className="w-full h-full" src={getImageUrl(unit.subcategoryImg)} />}
      </div>
      <div className="group-hover:text-background">
        <div className="flex justify-between items-center">
          <div className="font-semibold">
            {unit.name}
            {
              product.variable && ` (${ convertQuantityDtoToQuantity(unit.toBaseUnit) }${ product.baseUnit })`
            }
          </div>
          <div>
            <UnitDtoQuantityBadge 
              variable={product.variable}
              baseUnit={product.baseUnit}
              quantity={unit.quantity}
              toBaseUnit={unit.toBaseUnit}
            />
            <ProductTypeBadge 
              className='ml-2 font-semibold !text-xs text-background'
              variable={product.variable}
            />
          </div>
        </div>
        <div className="mt-1 text-xs">{unit.product.name} ({unit.product.identifier})</div>
      </div>
    </div>
  );
}

interface UnitSearchListProps {
  className?: string;
  units?: UnitResponseDto[];
  isLoading?: boolean;
  onValueChange: (unit: UnitResponseDto) => void
}

export function UnitSearchList
({ className, units, isLoading = false, onValueChange }: UnitSearchListProps) {
  return (
    <>
      <div className="mb-1 font-semibold text-muted-foreground text-xs">Search Units</div>
      <div className={cn([
        'space-y-2 font-body',
        className
      ])}>
        {
          units?.length === 0 &&
          <div className="place-content-center grid p-4 h-40 text-center text-muted-foreground text-sm">Empty...</div>
        }
        {isLoading &&
          <div className="place-content-center grid p-4 h-40">
            <LoadingSpinner className="w-20 h-20" />
          </div>
        }
        {units && units.map(u => (
          <div onClick={() => onValueChange(u)} key={u.id}>
            <UnitSearchItem unit={u} />
          </div>
        ))}
        {!units && 
          <div className="place-content-center grid p-4 h-40 text-center text-muted-foreground text-sm">Search for a unit...</div>
        }
      </div>
    </>
  );
}
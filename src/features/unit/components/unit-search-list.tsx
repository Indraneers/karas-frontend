import { cn } from "@/lib/utils";
import { UnitResponseDto } from "../types/unit.dto";
import { useQuery } from "@tanstack/react-query";
import { getSubcategoryById } from "@/features/subcategory/api/subcategory";
import { Box } from "lucide-react";
import { getImageUrl } from "@/lib/image";
import { Badge } from "@/components/ui/badge";
import { convertBaseUnitQuantityDtoToBaseUnitQuantity, convertBaseUnitQuantityToQuantity } from "../util/convert";

function UnitSearchItem({ unit } : { unit: UnitResponseDto}) {
  const { isLoading, data } = useQuery({ 
    queryKey: ['subcategory-' + unit.product.subcategoryId],
    queryFn: () => getSubcategoryById(unit.product.subcategoryId)
  });

  const product = unit.product;

  return (
    <div className="items-center gap-2 grid grid-cols-[auto,1fr] hover:bg-accent p-1 rounded-md cursor-pointer group">
      <div className="group-hover:bg-background border-2 border-accent p-2 rounded h-full aspect-square self-stretch">
        { (isLoading || !data?.img) && <Box className="w-full h-full text-primary" />}
        { (data && data.img) && <img className="w-full h-full" src={getImageUrl(data.img)} />}
      </div>
      <div className="group-hover:text-background">
        <div className="flex justify-between items-center">
          <div className="font-semibold">
            {unit.name}
            {
              product.variable && ` (${ convertBaseUnitQuantityDtoToBaseUnitQuantity(unit.toBaseUnit) }${ product.baseUnit })`
            }
          </div>
          <div>
            <Badge className="group-hover:text-background font-medium" variant="outline">
              {
                product.variable &&
                <>
                  {convertBaseUnitQuantityToQuantity(unit.toBaseUnit, unit.quantity)} Qty
                  {' '}({convertBaseUnitQuantityDtoToBaseUnitQuantity(unit.quantity)} {product.baseUnit})
                </>
              }
              {
                !product.variable &&
                <>{unit.quantity} Qty</>
              }
            </Badge>
            <Badge className={cn([
              'ml-2 text-background font-semibold !text-xs',
              product.variable && 'bg-amber-500 hover:bg-amber-600',
              !product.variable && 'bg-green-500  hover:bg-green-600'
            ])}>
              {
                product.variable 
                  ? 'VARIABLE' : 'COUNTABLE'
              }
            </Badge>
          </div>
        </div>
        <div className="mt-1 text-xs">{unit.product.name} ({unit.product.identifier})</div>
      </div>
    </div>
  );
}

export function UnitSearchList
({ className, units }: { className?: string, units?: UnitResponseDto[] }) {
  return (
    <>
      <div className="mb-1 font-semibold text-muted-foreground text-xs">Search Units</div>
      <div className={cn([
        'space-y-2 font-body',
        className
      ])}>
        {units && units.map(u => (
          <UnitSearchItem unit={u} key={u.id} />
        ))}
      </div>
    </>
  );
}
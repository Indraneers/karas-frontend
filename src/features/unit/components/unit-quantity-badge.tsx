import { Badge } from "@/components/ui/badge";
import { convertBaseQuantityToDisplayQuantity, convertBaseQuantityToQuantity } from "../util/convert";

export function UnitDtoQuantityBadge
({ variable, baseUnit, quantity, toBaseUnit }: { variable: boolean, baseUnit: string, quantity: number, toBaseUnit: number}) {
  return (
    <Badge className="font-medium group-hover:text-background" variant="outline">
      {
        variable &&
      <>
        {convertBaseQuantityToQuantity(toBaseUnit, quantity)} Qty
        {' '}({convertBaseQuantityToDisplayQuantity(toBaseUnit)}{baseUnit})
      </>
      }
      {
        !variable &&
      <>{convertBaseQuantityToQuantity(toBaseUnit, quantity)} Qty</>
      }
    </Badge>
  );
}

export function UnitQuantityBadge
({ variable, baseUnit, quantity, toBaseUnit }: { variable: boolean, baseUnit: string, quantity: number, toBaseUnit: number}) {
  return (
    <Badge className="font-medium group-hover:text-background" variant="outline">
      {
        variable &&
      <>
        {convertBaseQuantityToQuantity(toBaseUnit, quantity)} Qty
        {' '}({convertBaseQuantityToDisplayQuantity(toBaseUnit)}{baseUnit})
      </>
      }
      {
        !variable &&
      <>{convertBaseQuantityToQuantity(toBaseUnit, quantity)} Qty</>
      }
    </Badge>
  );
}
import { Badge } from "@/components/ui/badge";
import { convertBaseUnitQuantityDtoToBaseUnitQuantity, convertBaseUnitQuantityToQuantity } from "../util/convert";

export function UnitDtoQuantityBadge
({ variable, baseUnit, quantity, toBaseUnit }: { variable: boolean, baseUnit: string, quantity: number, toBaseUnit: number}) {
  return (
    <Badge className="group-hover:text-background font-medium" variant="outline">
      {
        variable &&
      <>
        {convertBaseUnitQuantityToQuantity(toBaseUnit, quantity)} Qty
        {' '}({convertBaseUnitQuantityDtoToBaseUnitQuantity(quantity)} {baseUnit})
      </>
      }
      {
        !variable &&
      <>{quantity} Qty</>
      }
    </Badge>
  );
}

export function UnitQuantityBadge
({ variable, baseUnit, quantity, toBaseUnit }: { variable: boolean, baseUnit: string, quantity: number, toBaseUnit: number}) {
  return (
    <Badge className="group-hover:text-background font-medium" variant="outline">
      {
        variable &&
      <>
        {convertBaseUnitQuantityToQuantity(toBaseUnit, quantity)} Qty
        {' '}({quantity} {baseUnit})
      </>
      }
      {
        !variable &&
      <>{quantity} Qty</>
      }
    </Badge>
  );
}
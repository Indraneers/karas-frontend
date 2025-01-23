import { Badge } from "@/components/ui/badge";
import { convertBaseQuantityToQuantity, convertQuantityDtoToQuantity } from "../util/convert";

export function UnitDtoQuantityBadge
({ variable, baseUnit, quantity, toBaseUnit }: { variable: boolean, baseUnit: string, quantity: number, toBaseUnit: number}) {
  return (
    <Badge className="group-hover:text-background font-medium" variant="outline">
      {
        variable &&
      <>
        {convertBaseQuantityToQuantity(toBaseUnit, quantity)} Qty
        {' '}({convertQuantityDtoToQuantity(quantity)} {baseUnit})
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
        {convertBaseQuantityToQuantity(toBaseUnit, quantity)} Qty
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
import { Badge } from "@/components/ui/badge";
import { convertBaseQuantityToQuantity, convertRawQuantityToBaseQuantity } from "../util/convert";

export function UnitDtoQuantityBadge
({ variable, baseUnit, quantity, toBaseUnit }: { variable: boolean, baseUnit: string, quantity: number, toBaseUnit: number}) {
  return (
    <Badge className="font-medium group-hover:text-background" variant="outline">
      {
        variable &&
      <>
        {convertBaseQuantityToQuantity(toBaseUnit, quantity)} Qty
        {' '}({convertRawQuantityToBaseQuantity(quantity)} {baseUnit})
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
    <Badge className="font-medium group-hover:text-background" variant="outline">
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
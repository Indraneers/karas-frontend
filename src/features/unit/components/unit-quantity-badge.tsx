import { Badge } from "@/components/ui/badge";
import { convertVariableQuantityToDiscreteQuantity, convertVariableQuantityToDisplayQuantity } from "../util/convert";

export function UnitDtoQuantityBadge
({ variable, baseUnit, quantity, toBaseUnit }: { variable: boolean, baseUnit: string, quantity: number, toBaseUnit: number}) {
  return (
    <Badge className="font-medium group-hover:text-background" variant="outline">
      {
        variable &&
      <>
        {convertVariableQuantityToDiscreteQuantity(toBaseUnit, quantity)} Qty
        {' '}({convertVariableQuantityToDisplayQuantity(quantity)}{baseUnit})
      </>
      }
      {
        !variable &&
      <>{convertVariableQuantityToDiscreteQuantity(toBaseUnit, quantity)} Qty</>
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
        {convertVariableQuantityToDiscreteQuantity(toBaseUnit, quantity)} Qty
        {' '}({convertVariableQuantityToDisplayQuantity(quantity)}{baseUnit})
      </>
      }
      {
        !variable &&
      <>{convertVariableQuantityToDiscreteQuantity(toBaseUnit, quantity)} Qty</>
      }
    </Badge>
  );
}
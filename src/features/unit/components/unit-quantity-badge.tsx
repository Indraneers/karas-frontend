import { Badge } from "@/components/ui/badge";
import { convertVariableQuantityToDiscreteQuantity, convertVariableQuantityToDisplayQuantity } from "../util/convert";

interface UnitQuantityBadgeProps {
  variable: boolean;
  baseUnit: string;
  quantity: number;
  toBaseUnit: number;
}

export function UnitQuantityBadge({ variable, baseUnit, quantity, toBaseUnit }: UnitQuantityBadgeProps) {
  return (
    <Badge className="font-medium group-hover:text-background" variant="outline">
      {
        variable &&
      <>
        {convertVariableQuantityToDiscreteQuantity(quantity, toBaseUnit)} Qty
        {' '}({convertVariableQuantityToDisplayQuantity(quantity)}{baseUnit})
      </>
      }
      {
        !variable &&
      <>{convertVariableQuantityToDiscreteQuantity(quantity, toBaseUnit)} Qty</>
      }
    </Badge>
  );
}

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  convertVariableQuantityToDiscreteQuantity,
  convertVariableQuantityToDisplayQuantity
} from "@/features/unit/util/convert";
import { RestockItem } from "../types/restock-item";
import { StockUpdate } from "../types/stock-update.enum";

interface UnitDelta {
  unitId: string;
  unitName: string;
  productName: string;
  variable: boolean;
  baseUnit: string;
  toBaseUnit: number;
  rawDelta: number;
}

function aggregate(restockItems: RestockItem[]): UnitDelta[] {
  const byUnit = new Map<string, UnitDelta>();

  for (const ri of restockItems) {
    const sign = ri.status === StockUpdate.RESTOCK ? 1 : -1;
    const existing = byUnit.get(ri.unit.id);

    if (existing) {
      existing.rawDelta += sign * ri.quantity;
    }
    else {
      byUnit.set(ri.unit.id, {
        unitId: ri.unit.id,
        unitName: ri.unit.name,
        productName: ri.unit.product.name,
        variable: ri.unit.product.variable,
        baseUnit: ri.unit.product.baseUnit,
        toBaseUnit: ri.unit.toBaseUnit,
        rawDelta: sign * ri.quantity
      });
    }
  }

  return Array.from(byUnit.values());
}

function formatDelta(d: UnitDelta): string {
  if (d.variable) {
    const litres = convertVariableQuantityToDisplayQuantity(d.rawDelta);
    return `${ litres >= 0 ? '+' : '' }${ litres }${ d.baseUnit }`;
  }

  const qty = convertVariableQuantityToDiscreteQuantity(d.rawDelta, d.toBaseUnit);
  return `${ qty >= 0 ? '+' : '' }${ qty } Qty`;
}

export function RestockUnitDeltas({ restockItems }: { restockItems: RestockItem[] }) {
  const deltas = aggregate(restockItems);

  if (deltas.length === 0) {
    return (
      <div className="text-muted-foreground text-xs xl:text-sm">
        No changes yet
      </div>
    );
  }

  return (
    <ScrollArea className="pr-2 max-h-32">
      <ul className="space-y-1">
        {deltas.map(d => (
          <li
            key={d.unitId}
            className="flex justify-between items-baseline gap-4 text-xs xl:text-sm"
          >
            <span className="text-muted-foreground truncate">
              {d.productName} <span className="text-foreground/70">· {d.unitName}</span>
            </span>
            <span className={cn([
              "font-semibold tabular-nums whitespace-nowrap",
              d.rawDelta > 0 && 'text-green-500',
              d.rawDelta < 0 && 'text-red-500'
            ])}>
              {formatDelta(d)}
            </span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}

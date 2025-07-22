import { Item } from "@/features/sale/types/item";
import { getQuantityFromItem } from "@/features/unit/util/convert";

export function ItemQuantity({ item } : { item: Item }) {
  if (item.unit.product.variable) {
    return (
      <div className="text-nowrap">{getQuantityFromItem(item)}{item.unit.product.baseUnit}</div>
    );
  }

  return (
    <div className="text-nowrap">{getQuantityFromItem(item)} {item.unit.name}</div>
  );
}
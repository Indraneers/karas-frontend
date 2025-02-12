import { Item } from "@/features/sale/types/item";

export function collateUnitItem(items: Item[]): Item[] {
  return items.reduce((result: Item[], curr) => {
    const foundCollatedItem =
      result.find(i => 
        i.unit.product.variable
        &&
        i.unit.product.id === i.unit.product.id
        &&
        i.price === curr.price
        &&
        i.discount == curr.discount
      );
    
    if (foundCollatedItem) {
      foundCollatedItem.quantity += curr.quantity;
    }
    else {
      result.push(curr);
    }

    return result;
  }, []);
}
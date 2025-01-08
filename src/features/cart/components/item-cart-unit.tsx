import { ItemCounter } from "@/features/cart/components/item-counter";
import { ItemCartCurrencyInput } from "./item-cart-currency-input";
import { calculateTotalCost } from "@/features/sale/utils/sale";
import { usePosStore } from "../../pos/store/pos";
import { ItemCartItem } from "./item-cart-item";
import { convertCurrencyToInputString, convertStringToCurrency } from "@/lib/currency";
import { Item } from "@/features/sale/types/item";
import { cn } from "@/lib/utils";

export function ItemCartUnit({ item }: { item: Item }) {
  const { updateItem, removeItem } = usePosStore();

  const price = item.price;
  const discount = item.discount;
  const qty = item.quantity;

  const product = item.unit.product;
  
  const totalCost = calculateTotalCost(price, discount, qty);
  <div className={cn([
    'hidden text-xs font-normal text-muted-foreground',
    product.identifier && 'block'
  ])}>
    {product.identifier}
  </div>;
  return (
    <ItemCartItem 
      product={item.unit.product}
      totalCost={totalCost} 
      onClickRemove={() => removeItem(item?.id || '')}
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col flex-grow justify-between h-full">
          {/* Unit Name, Product and SKU */}
          <div className="flex justify-between justify-items-start items-center gap-2 w-full">
            <div className="font-medium text-[14px]">
              {product.name}
            </div>
            <div className="font-medium text-sm self-start">
              {item.unit.name || ''}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className={cn([
              'hidden text-xs font-normal text-muted-foreground',
              product.identifier && 'block'
            ])}>
              {product.identifier}
            </div>
          </div>
          {/* Price, discount and quantity */}
          <div className="flex justify-between items-center gap-8 mt-2">
            <div className="flex gap-2">
              <ItemCartCurrencyInput 
                className="w-12 min-w-12"
                prefix="$"
                defaultValue={convertCurrencyToInputString(price)}
                onValueChange={(value) => updateItem(item.id, { ...item, price: convertStringToCurrency(value || '') })}
              />
              <ItemCartCurrencyInput 
                className="w-12 min-w-12"
                prefix="-$"
                defaultValue={convertCurrencyToInputString(discount)}
                onValueChange={(value) => updateItem(item.id, { ...item, discount: convertStringToCurrency(value || '') })}
              />
            </div>
            <ItemCounter
              variable={product.variable}
              baseUnit={product.baseUnit}
              value={qty}
              setValue={(value) => updateItem(item.id, { ...item, quantity: Number(value) })}
            />
          </div>
        </div>
      </div>
    </ItemCartItem>
  );
}
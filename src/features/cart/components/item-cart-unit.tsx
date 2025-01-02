import { ItemCounter } from "@/features/cart/components/item-counter";
import { Thumbnail } from "@/components/thumbnail";
import { ItemCartCurrencyInput } from "./item-cart-currency-input";
import { calculateTotalCost } from "@/features/sale/utils/sale";
import { usePosStore } from "../../pos/store/pos";
import { ItemCartItem } from "./item-cart-item";
import { convertCurrencyToInputString, convertStringToCurrency } from "@/lib/currency";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/features/product/api/product";
import { Item } from "@/features/sale/types/item";

export function ItemCartUnit({ item }: { item: Item }) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['product-', item.unit.product.id],
    queryFn: () => getProductById(item.unit.product.id || ''),
    enabled: !!item.unit
  });
  const { updateItem, removeItem } = usePosStore();

  const price = item.price;
  const discount = item.discount;
  const qty = item.quantity;
  
  const totalCost = calculateTotalCost(price, discount, qty);

  return (
    <ItemCartItem totalCost={totalCost} onClickRemove={() => removeItem(item?.id || '')}>
      <div className="flex items-center gap-2">
        <Thumbnail className="h-auto" src="/sample-product.webp"  />
        <div className="flex flex-col flex-grow justify-between gap-2 h-full">
          {/* Unit Name, Product and SKU */}
          <div className="flex justify-between justify-items-start items-center gap-2 w-full">
            <div>
              <div className="font-medium text-[14px]">
                {isError && "error"}
                {isLoading && "loading"}
                {data && data.name}
              </div>
              <div className="text-[8px] text-foreground/50">
                {item.unit?.sku || ''}
              </div>
            </div>
            <div className="font-medium text-xl">
              {item.unit?.name || ''}
            </div>
          </div>
          <div className="flex-grow"></div>
          {/* Price, discount and quantity */}
          <div className="flex justify-between items-center gap-8">
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
              value={String(qty)}
              setValue={(value) => updateItem(item.id, { ...item, quantity: Number(value) })}
            />
          </div>
        </div>
      </div>
    </ItemCartItem>
  );
}
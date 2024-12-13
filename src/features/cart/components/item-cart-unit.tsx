import { ItemCounter } from "@/features/cart/components/item-counter";
import { Thumbnail } from "@/components/thumbnail";
import { Item } from "@/types/item";
import { useState } from "react";
import { ItemCartCurrencyInput } from "./item-cart-currency-input";
import { calculateTotalCost } from "../../pos/utils/pos";
import { usePosStore } from "../../pos/store/pos";
import { ItemCartItem } from "./item-cart-item";

export function ItemCartUnit({ item }: { item: Item }) {
  const { removeItem } = usePosStore();
  const [price, setPrice] = useState<string>(item.price);
  const [discount, setDiscount] = useState<string>(item.discount);
  const [qty, setQty] = useState<string>(String(item.quantity));

  const totalCost = calculateTotalCost(price, discount, qty);

  return (
    <ItemCartItem totalCost={totalCost} onClickRemove={() => removeItem(item?.id || '')}>
      <div className="flex items-center gap-2">
        <Thumbnail className="h-auto" src="/sample-product.webp"  />
        <div className="flex flex-col flex-grow justify-between gap-2 h-full">
          {/* Unit Name, Product and SKU */}
          <div className="flex justify-between justify-items-start items-center gap-2 w-full">
            <div>
              <div className="text-[14px]">
                {item.product?.name}
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
                value={price}
                onValueChange={(value) => setPrice(value || '')}
              />
              <ItemCartCurrencyInput 
                className="w-12 min-w-12"
                prefix="-$"
                value={discount}
                onValueChange={(value) => setDiscount(value || '')}
              />
            </div>
            <ItemCounter value={qty} setValue={setQty} />
          </div>
        </div>
      </div>
    </ItemCartItem>
  );
}
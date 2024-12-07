import { ItemCounter } from "@/features/pos/components/item-counter";
import { Thumbnail } from "@/components/thumbnail";
import { Item } from "@/types/item";
import { useState } from "react";
import { ItemCardCurrencyInput } from "./item-card-currency-input";
import { calculateTotalCost } from "../utils/pos";

export function ItemCartItem({ item }: { item: Item }) {
  const [price, setPrice] = useState<string>((item.price / 100).toFixed(2));
  const [discount, setDiscount] = useState<string>((item.discount / 100).toFixed(2));
  const [qty, setQty] = useState<string>(String(item.quantity));

  const totalCost = calculateTotalCost(price, discount, qty);

  return (
    <div className="items-center grid grid-cols-[6fr,1fr] auto-rows-fr bg-accent rounded-lg h-full">
      <div className="flex flex-row items-center gap-2 bg-card p-2 rounded-lg h-full">
        <Thumbnail src="/sample-product.webp"  />
        <div className="flex flex-col flex-grow justify-between h-full">
          {/* Unit Name, Product and SKU */}
          <div className="flex justify-between items-center w-full">
            <div>
              <div className="text-[14px]">
                {item.product?.name}
              </div>
              <div className="text-[8px] text-foreground/50">
                {item.unit.sku}
              </div>
            </div>
            <div className="font-medium text-xl">
              {item.unit.name}
            </div>
          </div>
          <div className="flex-grow"></div>
          {/* Price, discount and quantity */}
          <div className="items-center grid grid-cols-[4fr,1fr,2fr]">
            <div className="flex gap-4">
              <ItemCardCurrencyInput 
                value={price}
                onValueChange={(value) => setPrice(value || '')}
              />
              <ItemCardCurrencyInput 
                value={discount}
                onValueChange={(value) => setDiscount(value || '')}
              />
            </div>
            <div>
            </div>
            <ItemCounter value={qty} setValue={setQty} />
          </div>
        </div>
      </div>
      <div className="place-content-center grid text-background text-xs">
        $ {totalCost}
      </div>
    </div>
  );
}
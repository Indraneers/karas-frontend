import { usePosStore } from "@/features/pos/store/pos";
import { calculateTotalCost } from "@/features/pos/utils/pos";
import { AutoServiceItem } from "@/features/service-selector/types/auto-service-item";
import { ItemCartItem } from "./item-cart-item";
import { ItemCartCurrencyInput } from "./item-cart-currency-input";

export function ItemCartService({ autoServiceItem } : { autoServiceItem: AutoServiceItem }) {
  const { updateService, removeService } = usePosStore();
  const price = autoServiceItem.price;
  const discount = autoServiceItem.discount;
  const totalCost = calculateTotalCost(price, discount, '1');

  return (
    <ItemCartItem totalCost={totalCost} onClickRemove={() => removeService(autoServiceItem.autoService.id)}>
      <div className="flex flex-col gap-5">
        <div className="flex-grow pl-4 text-md self-start">
          {autoServiceItem.autoService.name}
        </div>
        <div className="flex justify-between">
          <div className="text-foreground/50 text-xs self-end">
            Service Check
          </div>
          <div className="flex gap-2">
            <ItemCartCurrencyInput 
              className="w-12 min-w-12"
              prefix="$"
              value={autoServiceItem.price}
              onValueChange={(value) => updateService({ ...autoServiceItem, price: value || '' })}
            />
            <ItemCartCurrencyInput 
              className="w-12 min-w-12"
              prefix="-$"
              value={autoServiceItem.discount}
              onValueChange={(value) => updateService({ ...autoServiceItem, discount: value || '' })}
            />
          </div>
        </div>
      </div>
    </ItemCartItem>
  );
}